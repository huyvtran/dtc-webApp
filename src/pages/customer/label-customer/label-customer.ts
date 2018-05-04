import { LabelUpdatePage } from './../label-update/label-update';
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
 * Generated class for the LabelCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-label-customer',
  templateUrl: 'label-customer.html',
})
export class LabelCustomerPage {
  search_img = AppConfig.search_img;
  avatar_img = AppConfig.head;
  title = '添加客户';
  listCustomer = [];
  list = [];
  lists=[];
  newList = [];
  a: any;
  z={};
  resolve:any;
  text:any;
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
    this.title = '添加客户';
    this.showMenu = true;
    this.showCheckbox();
  
    this.resolve = this.navParams.get("resolve");
    this.lists = this.navParams.get("message");
    console.log(this.lists);
  }

  showCheckbox() {
    let data = {}
    let self = this;
    this.httpService.getMessages(data, function (res) {
      if (res.code === 100000) {
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].list.length; j++) {
            for (let a = 0; a < self.lists.length; a++) {
              if (self.lists[a].list) {
                for (let e = 0; e < self.lists[a].list.length; e++) {
                  if (res.data[i].list[j].id == self.lists[a].list[e].id) {
                      res.data[i].list[j].checked = true;
                  }
                }
              }
            }
            if (!res.data[i].list[j].avatar) {
              res.data[i].list[j].avatar = AppConfig.head
            }
          }
        }
        self.listCustomer = res.data;
      }
    })


    // this.httpService.post(AppConfig.API.personnelList, data).subscribe(res => {
    //   console.log(res);
    //   for (let i = 0; i < res.data.length; i++) {
    //     for (let j = 0; j < res.data[i].list.length; j++) {
    //         for(let a=0;a<this.lists.length;a++){
    //           if(this.lists[a].list){
    //             for (let e = 0; e < this.lists[a].list.length; e++) {
    //               if (res.data[i].list[j].id == this.lists[a].list[e].id) {
    //                   res.data[i].list[j].checked = true;
    //               }
    //             }
    //           }                          
    //         }
    //       if (!res.data[i].list[j].avatar) {
    //         res.data[i].list[j].avatar = AppConfig.head
    //       }
    //     }
    //   }
    //   console.log(this.lists);
    //   this.listCustomer = res.data;
    // })

  }



  // 搜索
  search() {
    let data = {
      frontParam: this.text
    }
    this.listCustomer = [''];
    this.getMessage(data);
  }

  getMessage(data) {
    let self = this;
    this.httpService.getMessage(data, function (res) {
      if (res.code === 100000) {
        self.listCustomer = res.data;
      }
    })
  }



  //获取当前对象的数组
  pushList(item,key) { 
    for(var i in this.lists){
      var obj= this.lists[i];
      if(obj.key==key){
        var index = obj.list.indexOf(item);
           if(item.checked){
              obj.list.push(item)
           }else{
              obj.list.splice(index,1)
           }
      }
    }
    console.log(this.lists);  
 }

  trues() {
    this.resolve(this.lists).then((result) => {});
    this.navCtrl.pop();
  }




  // removal() {
  //   console.log(this.list)
  //   if (this.list.length > 0) {
  //     for (let i = 0; i < this.list.length; i++) {
  //       for (let j = 0; j < this.list.length; j++) {
  //         if (this.list[i].id != this.list[j].id) {
  //           this.newList.push(this.list[i]);
  //         }
  //       }
  //       console.log(this.newList)
  //     }

  //   }
  // }



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
