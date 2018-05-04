import { LabelUpdatePage } from './../label-update/label-update';
import { LabelEstablishPage } from './../label-establish/label-establish';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';

import { SetupPage } from '../../setups/setup/setup';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
/**
 * Generated class for the LabelManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-label-management',
  templateUrl: 'label-management.html',
})
export class LabelManagementPage {
  title = '标签管理';
  showUserImg = false;
  showMenu = true;
  //加载图片
  ChuangjiaBiaoqian_img = AppConfig.chuangJian_img;
  list=[];
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
  ionViewWillEnter (){
    this.title = '标签管理';
    this.showMenu = true;
    this.getList()
  }

  getList() {
    let data={}
    this.httpService.post(AppConfig.API.labelList,data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
         this.list=res.data;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


update(id){
  this.navCtrl.push(LabelUpdatePage,{
    'id':id
  })
}
//删除
// deleteLabel(id){
//   for(let i in this.list){
//     if(this.list[i] == id){
//       let index = this.list[i].indexOf(id);
//       this.list.splice(index,1);
//       this.httpService.get(AppConfig.API.deleteLabel+id).subscribe(res => {
//         console.log(res)
//         let code = res.code
//         if (code === 100000) {
//           this.getList();
//         } else {
//           this.httpService.showToast(res.msg, '');
//         }
//       }, error => {
//         this.httpService.dismissLoading();
//         this.httpService.showToast('请检查参数或路径是否正确');
//       });
//     }
//   }
// }
delete(item){ 
  for(let i=0; i<this.list.length;i++){
    if(this.list[i] == item){
      let ids = [this.list[i].id];
      this.list.splice(i,1);
      this.httpService.get(AppConfig.API.deleteLabel+ids).subscribe(res => {
        console.log(res)
        let code = res.code
        if (code === 100000) {
          this.getList();
        } else {
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('请检查参数或路径是否正确');
      });

    }
  }
}

  //跳转页面
  tolabelestablish(){
    this.navCtrl.push(LabelEstablishPage)
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
