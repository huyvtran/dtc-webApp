import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the FortgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fortg',
  templateUrl: 'fortg.html',
})
export class FortgPage {
  title = '订单详情';
  switch:boolean = false;
  showUserImg = false;
  showMenu = true;
  //加载图片
  Commodity_img = AppConfig.commodity_img;//商品图片
  Car_img = AppConfig.car_img;//运输车的图片
  Coordinate_img = AppConfig.coordinate_img;//坐标地址
  Lipin_img = AppConfig.liPin_img;//礼品添加
  Apporved_img = AppConfig.appRoved_img;//审批方式
  Payment_img = AppConfig.payment_img;//付款方式

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.switch = true;
    this.showMenu = false;
  }
  ionViewWillEnter (){
    this.title = '订单详情';
    this.switch = false;
    this.showMenu = true;
    console.log('ionViewDidLoad FortgPage');
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
