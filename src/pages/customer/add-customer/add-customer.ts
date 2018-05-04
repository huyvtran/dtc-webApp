import { LabelEstablishPage } from './../label-establish/label-establish';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { SetupPage } from '../../setups/setup/setup';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { AppConfig } from './../../../app/main';
/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  search_img = AppConfig.search_img;
  avatar_img = AppConfig.head;
  title = '添加客户';
  listCustomer = [];
  list = [];
  newList = [];
  showUserImg=false;
  showMenu=true;
  a: any;
  text:any;
  resolve: any;
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewWillLeave () {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter (){
    this.title = "添加客户";
    this.showMenu = true;
    this.showCheckbox();

    this.resolve = this.navParams.get("resolve");
  }

  showCheckbox() {
    let data={}
    this.getMessage(data);
  }



  //获取当前对象的数组
  pushList(item) {
    var index = this.list.indexOf(item);
    if (item.checked) {
      this.list.push(item);

    } else {
      this.list.splice(index, 1);
    }
  }


  // 搜索
  search() {
    let data = {
      frontParam: this.text
    }
    this.listCustomer = [''];
    this.getMessage(data);
  }

  getMessage(data) {
    let self = this;
    this.httpService.getMessages(data, function (res) {
      if (res.code === 100000) {
        self.listCustomer = res.data;
      }
    })
  }




  trues() {
    this.resolve(this.list).then((result) => { });
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
