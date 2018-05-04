import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from './../../../app/main';
/**
 * Generated class for the OrganizerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organizer',
  templateUrl: 'organizer.html',
})
export class OrganizerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider) {
  }


  title;
  listCustomer = [];
  avatar_img = AppConfig.head;
  organizer = {};
  organizerId;
  resolve: any;
  customer=false;
  showUserImg = false;
  showMenu=true;
  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.resolve = this.navParams.get("resolve");
    this.organizerId = this.navParams.get("organizerId");
    this.customer = this.navParams.get("customer");
    this.title = this.customer?'活动客户':'组织者';
    this.getList();
  }
  //
  // 获取人员列表
  getList() {
    this.httpService.post(AppConfig.API.chooseCustomers, {}).subscribe(res => {
      if (res.code == 100000) {
        console.log(res);
        this.listCustomer = res.data;
        // 选中回现
        if (this.organizerId == -1) {
          this.organizer = { id: -1, username:'无组织者'};
        } else {
          for (let i = 0; i < this.listCustomer.length; i++) {
            if (this.listCustomer[i].list.length > 0) {
              for (let j = 0; j < this.listCustomer[i].list.length; j++) {
                if (this.listCustomer[i].list[j].id == this.organizerId) {
                  this.listCustomer[i].list[j].check = true;
                  this.organizer = this.listCustomer[i].list[j];
                } else {
                  this.listCustomer[i].list[j].check = false
                }
              }
            }
          }
        }

        // console.log(this.saleslist);
      } else {

      }
    })
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

  // 选择销售
  selectSales(item) {
    console.log(item);
    this.organizer = item;
  }

  // 取消返回
  back() {
    this.navCtrl.pop();
  }

  // 确定
  makeSure() {
    if (this.organizer) {
      this.resolve(this.organizer).then((result) => { });
      this.navCtrl.pop();
    } else {
      if(this.customer){
        this.httpService.showToast("请选择活动客户");
      }else {
        this.httpService.showToast("请选择组织者");
      }
      
    }
  }

}
