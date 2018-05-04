import { DetailsPage } from './../details/details';
import { ShaixuanPage } from './../shaixuan/shaixuan';
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
 * Generated class for the AddShaixuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shaixuan',
  templateUrl: 'add-shaixuan.html',
})
export class AddShaixuanPage {
  title = '筛选结果';
  avatar_img = AppConfig.head;
  listCustomer = [];
  newList = [];
  a: any;
  showUserImg = false;
  showMenu = true;
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
  ionViewWillEnter (){
    this.title = '筛选结果';
    this.showMenu = true;
    this.showCheckbox()

  }

  showCheckbox() {
    let data=this.navParams.get("list")
    let self = this;
    this.httpService.getMessage(data, function (res) {
      if (res.code === 100000) {
        self.listCustomer = res.data;
      }
    })

  }


customer(id){
  this.navCtrl.push(DetailsPage,{
    'id':id
  })
}

trues(){
  this.navCtrl.pop()
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
