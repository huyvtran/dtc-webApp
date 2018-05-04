import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { ManualAddPage} from "../../customer/manual-add/manual-add";
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the ActivitycodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activitycode',
  templateUrl: 'activitycode.html',
})
export class ActivitycodePage {
  //头部的显隐
  title = '活动二维码';
  showUserImg = false;
  showMenu=true;
  customerDetail={}
  ticket:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider) {
  }
  ionViewWillLeave (){
    this.title = ' ';
    this.showMenu = false;
  }

  ionViewWillEnter () {
    
    this.title = '活动二维码';
    this.showMenu = true;
    this.customerDetail= this.navParams.get("customerDetail");
    this.ticket= this.navParams.get("ticket");
    this.showMessage();
  }

  showMessage() {
    // 获取会员信息
    if (this.ticket) {
      this.ticket = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + this.ticket;
      console.log(this.ticket)
    } else {
     
    }

  }
  addCustomer(){
    this.navCtrl.push(ManualAddPage,{customerDetail:this.customerDetail})
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
