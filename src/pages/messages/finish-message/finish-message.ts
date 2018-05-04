import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { SetupPage } from '../../setups/setup/setup';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the FinishMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-finish-message',
  templateUrl: 'finish-message.html',
})
export class FinishMessagePage {
  show = true;
  title = '消息(0)';
  messageList = [];
  showMenu = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider) {
  }

  ionViewWillLeave() {
    this.show = false;
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.show = true;
    this.showMenu = true;
    this.title = '消息(0)';
    console.log('ionViewDidLoad FinishMessagePage');
    this.getMessagedetail();

  }
  getMessagedetail() {
    let msg_index = this.navParams.get('msg_index');
    console.log("msg_index"+msg_index);
    let msgTypeList = ["订单中心", "活动中心", "产品中心", "客户管理", "品牌中心"];
    let mesType = "";
    for (let i = 0; i < msgTypeList.length; i++) {
      if (msg_index == i) {
        mesType = msgTypeList[i];
        break;
      }
    }
    this.httpService.posts(AppConfig.API.getMessageList, { mesType }).subscribe(res => {
      console.log(res);
      if (res.code == 100000) {
        this.messageList = res.data.data;
        this.title = `消息(${res.data.data.length})`;
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })

  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }
  settings() {
    this.navCtrl.push(SetupPage);
  }
}
