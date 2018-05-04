import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the QrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {
  title = "付款码";
  showUserImg = false;
  showMenu = true;
  img:any;
  createdCode:any;
  index:any;
  time:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewWillLeave() {
    clearInterval(this.time); 
    this.showMenu=false;
    this.title = " ";
  }
  ionViewWillEnter (){
    this.showMenu=true;
    this.title = '付款码';
    this.getCode();
  }
  getCode(){
    var pays;
    var b;
    var isV;
    if (this.navParams.get('pay')==5){
        pays=5;
        b = "wechat"
    } else if (this.navParams.get('pay') == 6){
      pays=6;
      b ="alipay"
    }

    if (this.navParams.get('isLogisticsOrder') == 0) {
      isV = 4
    } else if (this.navParams.get('isLogisticsOrder') == 1) {
      isV = 3
    }

    let data = {
      "companyId": 85,  //companyId
      "memberId": this.navParams.get('id'),    //会员id
      "orderNo": this.navParams.get('code'), //提交订单返回的订单号
      "outOrderNo": "",  //传我空字符串
      "payOrderItems": [
        {
          "amount": this.navParams.get('money'),  //支付金额
          "extendInfo": { "paymentType": "2" }, //2为被扫  app端统一为2
          "paymentType":b,
          "className": "", //空字符串
          "deviceEn": "",  //空字符串
          "packageName": "", //空字符串
          "paymentTypeId": pays
        }
      ],
      "storeId": 99999,  //门店id
      "totalAmount": this.navParams.get('money'), //支付金额
      "type": 1,        //1消费
      "version": isV       //1为publicStore 2为privateStore 3为app端下单  4为活动单下单
    }
    console.log(data);
    this.httpService.post(AppConfig.API.payment,data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.createdCode = res.data.url;
        this.getTime();
      } else {
        this.httpService.showToast(res.msg, '');
      }
      console.log(this.img);
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  
getTime(){
    let self=this;
    this.time=setInterval(function() {
      self.getStatus();
    }, 10000);
}

  //获取订单状态
  getStatus() {    
    this.httpService.get(AppConfig.API.getStatus + this.navParams.get('code')).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        if (res.data) {
          if (res.data.status != 1) {
            clearInterval(this.time);         
            this.navCtrl.popToRoot();
            this.navCtrl.parent.select(1);          
          }
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
