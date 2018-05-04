import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
/**
 * Generated class for the WriteoffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-writeoff',
  templateUrl: 'writeoff.html',
})
export class WriteoffPage {
  title = '核销活动';
  showUserImg = false;
  showMenu=true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewWillLeave (){
    this.showMenu=false;
    this.title = ' ';
  }
  ionViewWillEnter () {
    this.showMenu=true;
    this.title = '核销活动';
    console.log('ionViewDidLoad WriteoffPage');
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
