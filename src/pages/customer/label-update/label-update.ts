import { LabelEstablishPage } from './../label-establish/label-establish';
import { LabelCustomerPage } from './../label-customer/label-customer';
import { LabelManagementPage } from './../label-management/label-management';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { SetupPage } from '../../setups/setup/setup';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the LabelUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-label-update',
  templateUrl: 'label-update.html',
})
export class LabelUpdatePage {
  title = "更新标签";
  Tianjia_img = AppConfig.chuangJian_img;
  Customer_Img = AppConfig.head
  list = [];
  name: any;
  ids = [];
  message = [];
  memberFront = [];
  newDate = [];
  listCustomer = [];
  showUserImg = false;
  showMenu = true;
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams, ) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '更新标签';
    this.showMenu = true;

  }

  ionViewDidLoad() {
    this.label();
  }
  return() {
    this.navCtrl.pop()
  }

  goDetails(id) {
    console.log(id)
    this.navCtrl.push(DetailsPage, {
      'id': id
    })
  }

  // 回显
  label() {
    let id = this.navParams.get("id");
    this.httpService.get(AppConfig.API.queryLabel + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.message = res.data;
        this.name = res.data.tagName;
        this.newDate = res.data.memberFrontQueries;
        this.listCustomer = res.data.memberFrontReturnParams;
        this.getIds();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  addcustomer() {
    this.navCtrl.push(LabelCustomerPage, { resolve: this.callback, id: this.navParams.get("id"), message: this.listCustomer });
  }

  callback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.listCustomer = data;
      console.log(this.listCustomer);
      this.ret();
      resolve();
    });
  }


getIds(){
  if (this.listCustomer) {
      for (let i = 0; i < this.listCustomer.length; i++) {
        for (let j = 0; j < this.listCustomer[i].list.length; j++) {
          var then = this.listCustomer[i].list[j].id;     
            var ids = {
              "id": then
            }
            this.memberFront.push(ids)
          }
        console.log(this.memberFront)
      }
    }
}


  ret() {
    this.memberFront=[];
    this.getIds();
  }



  delete(id) {
    console.log(id);
    for (let i = 0; i < this.memberFront.length; i++) {
      if (this.memberFront[i].id == id) {
        this.memberFront.splice(i, 1);
      }
    }

    for (let i = 0; i < this.listCustomer.length; i++) {
      for (let j = 0; j < this.listCustomer[i].list.length; j++) {
        var then = this.listCustomer[i].list[j].id;
        if (then == id) {
          this.listCustomer[i].list.splice(j, 1)
        }
      }
    }
    console.log(this.memberFront, this.listCustomer)
  }

  // 提交
  addLabel() {
    let data = {
      id: this.navParams.get("id"),
      tagName: this.name,
      memberFrontQueries: this.memberFront
    }
    console.log(data);
    this.httpService.post(AppConfig.API.updateLabel, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.list = res.data;
        this.return()
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
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
