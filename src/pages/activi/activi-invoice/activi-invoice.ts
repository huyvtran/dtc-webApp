import { ActiviUpdatePage } from './../activi-update/activi-update';
import { ActiviStatePage } from './../activi-state/activi-state';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';

/**
 * Generated class for the ActiviInvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activi-invoice',
  templateUrl: 'activi-invoice.html',
})
export class ActiviInvoicePage {

  title = '发票信息';
  showUserImg = false;
  showMenu=true;
  d = true;
  lists = [];
  resolveInv: any;
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams, ) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }

  ionViewWillEnter() {
    this.resolveInv = this.navParams.get("resolveAdd");
    this.title = '发票信息';
    this.showMenu = true;
    this.getDetails()
  }
  userInfo = [];

  getDetails() {
    let id = this.navParams.get("id");
    console.log(id)
    this.httpService.get(AppConfig.API.invoiceList + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.userInfo = res.data
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  pushList(item) {
    this.lists = [];
    if (item) {
      this.lists.push(item);
    }
    console.log(this.lists)
  }


  ionIoniceState() {
    this.navCtrl.push(ActiviStatePage, {
      'id': this.navParams.get("id")
    });
  }


  delete(id) {
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

  setup(id) {
    let data = {
      id: id,
      memberId: this.navParams.get("id")
    }
    console.log(data)
    this.httpService.post(AppConfig.API.setupInvoice, data).subscribe(res => {
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
    this.navCtrl.push(ActiviUpdatePage, {
      'id': id
    })
  }

  pop() {
    this.resolveInv(this.lists).then((result) => { });
    this.navCtrl.pop()
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
