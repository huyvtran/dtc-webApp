import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  title = '添加新发票';
  showUserImg = false;
  showMenu = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLeave() {
    this.showMenu=false;
    this.title = " ";
  }
  ionViewWillEnter (){
    this.showMenu = true;
    this.title = '添加新发票';
    console.log('ionViewDidLoad InvoicePage');
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
