import { LabelManagementPage } from './../label-management/label-management';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddCustomerPage } from './../add-customer/add-customer';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { SetupPage } from '../../setups/setup/setup';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
/**
 * Generated class for the LabelEstablishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-label-establish',
  templateUrl: 'label-establish.html',
})
export class LabelEstablishPage {
  title = '创建标签';
  //加载图片
  Tianjia_img = AppConfig.chuangJian_img;
  list=[];
  name:any;
  ids=[];
  memberFrontQueries=[];
  showUserImg = false;
  showMenu = true;
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,) {
  }
  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
 
  ionViewWillEnter (){
    this.title = '创建标签';
    this.showMenu = true;
    // this.getIds()
  }

  addcustomer() {
    this.navCtrl.push(AddCustomerPage, { resolve: this.callback });
  }
  callback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.list=data;
      console.log(this.list);
      if (this.list) {
          for (let i = 0; i < this.list.length; i++) {
            var then = this.list[i].id;
            var ids = {
              "id": then
            }
            this.memberFrontQueries.push(ids)
          }
          console.log(this.memberFrontQueries)
        }
      resolve();
    });
  }

return(){
  this.navCtrl.pop()
}


  addLabel(){
    if (!this.name) {
      this.httpService.showToast('请输入标签名');
      return;
    }

    let data = {
      tagName:this.name,
      memberFrontQueries: this.memberFrontQueries
    }
    this.httpService.post(AppConfig.API.addLabel, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.list = res.data;     
        this.return();     
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
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
