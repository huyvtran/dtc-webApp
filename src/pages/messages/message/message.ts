import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { FinishMessagePage } from '../finish-message/finish-message';
import { SetupPage } from '../../setups/setup/setup';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  showUserImg = false;
  showMenu = true;
  orderNew = {   //订单中心
    message:"",
    createTime:new Date(),
    isRead:true
  }; 
  activiNew = {  //活动中心
    message:"",
    createTime:new Date(),
    isRead:true
  }; 
  productNew = {  //产品中心
    message:"",
    createTime:new Date(),
    isRead:true
  }; 
  customerNew = {  //客户管理
    message:"",
    createTime:new Date(),
    isRead:true
  }; 
  brandsNew = {  //品牌中心
    message:"",
    createTime:new Date(),
    isRead:true
  }; 
  //加载图片
  head_pash_img = AppConfig.head_img;
  Activity_img = AppConfig.Activity_img;
  title = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider) {
  }

  ionViewWillLeave() {
    this.title = " ";
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = "消息";
    console.log('ionViewDidLoad MessagePage');
    this.showMenu = true;
    this.getMessageList();
  }

  getMessageList() {
    this.httpService.get(AppConfig.API.getMessageNews).subscribe(res => {
      console.log(res);
      if (res.code == 100000) {
        let messageList = res.data;
        messageList.forEach((element, i) => {
          if (element["订单中心"]) {
            this.orderNew = element["订单中心"];
          } else if (element["活动中心"]) {
            this.activiNew = element["活动中心"];
          } else if (element["产品中心"]) {
            this.productNew = element["产品中心"];
          } else if (element["客户管理"]) {
            this.customerNew = element["客户管理"];
          } else if (element["品牌中心"]) {
            this.brandsNew = element["品牌中心"];
          }
        });
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }

  getNews(msg_index) {
    this.navCtrl.push(FinishMessagePage, { msg_index });
  }

  cart() {
    this.navCtrl.push(ShoppingCartPage);
  }
  settings() {
    this.navCtrl.push(SetupPage);
  }

}
