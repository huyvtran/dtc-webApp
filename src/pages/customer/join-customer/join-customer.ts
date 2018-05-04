import { ManualAddPage } from './../manual-add/manual-add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the JoinCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-customer',
  templateUrl: 'join-customer.html',
})
export class JoinCustomerPage {
  title = '添加客户';
  //加载图片
  erWeima_img = AppConfig.erWeima_img;

  ticket:any;
  /* 头部显隐 */
  switch:boolean = false;
  showUserImg = false;
  showMenu = true;
  show=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
  private httpService: HttpServiceProvider,) {
  }
  ionViewWillLeave(){
    this.title = ' ';
    this.switch = true;
    this.show=false;
    this.showMenu = false;
  }

  ionViewWillEnter () {
    this.title = '添加客户';
    this.showMenu = true;
    this.switch = false;
    this.show = true;
    // 获取会员信息
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        var data = res.data;
        self.showMessage(data)
      }
    })

  }

  showMessage(data) {
    // 获取会员信息
    if (data.ticket) {
      this.ticket = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + data.ticket;
    } else {
     
    }

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

  addcustomer(){
    this.navCtrl.push(ManualAddPage)
  }

}
