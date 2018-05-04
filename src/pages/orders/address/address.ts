import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  //标题
  title = '添加地址';
  showUserImg=false;
  showMenu = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLeave() {
    //隐藏
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter (){
    this.showMenu = true;
    this.title = '添加地址';
    console.log('ionViewDidLoad AddressPage');
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
