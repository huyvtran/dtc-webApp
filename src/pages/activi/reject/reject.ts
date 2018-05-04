import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
/**
 * Generated class for the RejectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reject',
  templateUrl: 'reject.html',
})
export class RejectPage {
  title = '驳回理由';
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
    this.title = '驳回理由';
    console.log('ionViewDidLoad RejectPage');
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
