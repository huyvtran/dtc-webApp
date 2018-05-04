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
 * Generated class for the OnlineCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-online-customer',
  templateUrl: 'online-customer.html',
})
export class OnlineCustomerPage {
  search_img = AppConfig.search_img;
  avatar_img = AppConfig.head;
  title = '添加客户';
  listCustomer = [];
  list = [];
  newList = [];
  a: any;
  text: any;
  resolve: any;
  ids=[];
  li=[];
  showUserImg = false;
  showMenu = true;
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.title = "选择客户";
    this.showCheckbox();
    this.resolve = this.navParams.get("resolve");
    this.li = this.navParams.get("lists");
    console.log(this.li)
  }

  showCheckbox() {
    let data = {}
    this.getMessage(data);
  }
  //获取当前对象的数组
  pushList(item) {
    this.list=[];
    if (item) {
      this.list.push(item);
    }
    console.log(this.list)
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
    this.httpService.posts(AppConfig.API.chooseCustomers, data).subscribe(res => {
      console.log(res.data);
      this.listCustomer = res.data;
    })
  }
  trues() {
    var a=[];
    a.push(this.list);
    a.push(this.li);
    this.resolve(a).then((result) => {});
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
