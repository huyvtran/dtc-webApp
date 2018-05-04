import { DetailsInvoicePage } from './../details-invoice/details-invoice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceStatePage } from '../invoice-state/invoice-state';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
/**
 * Generated class for the InvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  title = '发票信息';
  d=true;
  add=true;
  noadd=false;
  showUserImg = false;
  showMenu = true;
  constructor(
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams, ) {
  }
  ionViewWillLeave (){
    this.title = ' ';
    this.showMenu = false;
  }

  ionViewWillEnter () {
    this.title = '发票信息';
    this.showMenu = true;
    // this.storage.get('userinfo').then((val) => {
    //   if (val) {
    //     if (val.role.name != "DTC Head" && val.role.name != "DTC Sales" && val.role.name != "Marketing Head" && val.role.name != "Marketing"
    //       && val.role.name != "Marketing & HR" && val.role.name != "Training Team Head" && val.role.name != "Trainer") {
    //       this.d=false;
    //     }
    //   } else {

    //   }
    // });
 
    var clean=this.navParams.get('clean');
    if(clean==true){
      this.add=false;
      this.noadd=true;

    }

    this.getDetails()
  }
 userInfo=[];

  getDetails() {
    let id = this.navParams.get("id");
    console.log(id)
    this.httpService.get(AppConfig.API.invoiceList + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
          this.userInfo=res.data
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }



  ionIoniceState(){
    this.navCtrl.push(InvoiceStatePage,{
      'id': this.navParams.get("id")
    });
  }

  ionIoniceStates() {
    this.httpService.showToast('您无法添加发票');
    return;
  }

  delete(id){
    this.httpService.get(AppConfig.API.dateleInvoice + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
          this.getDetails()
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  deletes() {
    this.httpService.showToast('您无法删除发票');
    return;
  }

  setup(id){
    let data={
      id:id,
      memberId: this.navParams.get("id")
    }
    console.log(data)
    this.httpService.post(AppConfig.API.setupInvoice,data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.getDetails()
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  update(id) {
    this.navCtrl.push(DetailsInvoicePage,{
      'id': id
    })
  }
  updates() {
    this.httpService.showToast('您无法更新发票');
    return;
  }



  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }

}
