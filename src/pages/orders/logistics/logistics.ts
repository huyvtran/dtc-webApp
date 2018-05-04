import { LogisticsOrderPage } from './../logistics-order/logistics-order';
import { ReturnOrderPage } from './../return-order/return-order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentVoucherPage } from '../payment-voucher/payment-voucher';
import { ReceiptPage } from '../receipt/receipt'
import { QrCodePage } from '../qr-code/qr-code'
import { GiftListPage } from '../gift-list/gift-list'
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';

/**
 * Generated class for the LogisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logistics',
  templateUrl: 'logistics.html',
})
export class LogisticsPage {
  title = '物流信息';
  showUserImg = false;
  showMenu = true;
  status='';
  number:any;
  companyName:any;

  logisticsList=[];
  logisticsLists=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider) {
  }

  ionViewWillLeave() {
    this.showMenu=false;
    this.title = " ";
  }
  ionViewWillEnter (){
    this.showMenu=true;
    this.title = '物流信息';
    console.log('ionViewDidLoad LogisticsPage');
    this.getLogistics();
  }

 //物流信息
  getLogistics(){
    this.httpService.get(AppConfig.API.getLogistics + this.navParams.get("id")).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code == 100000) {
        if (res.data.orderLogistics) {
          if (res.data.orderLogistics.logisticsStatus) {
            if (res.data.orderLogistics.logisticsStatus == 1) {
              this.status = '待发货'
            } else if (res.data.orderLogistics.logisticsStatus == 2) {
              this.status = '已发货'
            } else if (res.data.orderLogistics.logisticsStatus == 3) {
              this.status = '已到货'
            }
          }

          if (res.data.orderLogistics.logisticsNumber) {
            this.number = res.data.orderLogistics.logisticsNumber
          }

          if (res.data.orderLogistics.companyName) {
            this.companyName = res.data.orderLogistics.companyName
          }
        }
          if (res.data.logisticsInfo != null) {
            var list = res.data.logisticsInfo;
            this.logisticsList.push(list[0]);
            this.logisticsLists = list.slice(1);
            console.log(this.logisticsList, this.logisticsLists);
          }      
       
       
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }

}
