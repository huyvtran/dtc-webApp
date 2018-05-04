import { ActivityDeliverPage } from './../activity-deliver/activity-deliver';
import { ActiviDetailPage } from './../activi-detail/activi-detail';
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
 * Generated class for the ActiviCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activi-customer',
  templateUrl: 'activi-customer.html',
})
export class ActiviCustomerPage {
  search_img = AppConfig.search_img;
  avatar_img = AppConfig.head;
  title = '添加客户';
  showUserImg = false;
  showMenu=true;
  listCustomer = [];
  list = [];
  newList = [];
  a: any;
  text: any;
  resolve: any;
  ids = [];
  id:any;
  itemList=[];
  true:1;
  name:any;
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
    this.id=this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.itemList = this.navParams.get('itemList');
    console.log(this.id, this.itemList);
    this.title = "选择客户";
    this.showMenu = true;
    this.showCheckbox();
  }

  showCheckbox() {
    let data = {}
    this.getMessage(data);
  }
  //获取当前对象的数组
  pushList(item) {
    this.list = [];
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
      this.navCtrl.push(ActiviDetailPage, { list: this.list, id: this.id, itemList: this.itemList,name:this.name})
  }
  cancel(){
    this.navCtrl.pop();
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
