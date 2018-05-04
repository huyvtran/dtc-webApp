import { AddShaixuanPage } from './../add-shaixuan/add-shaixuan';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ShaixuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shaixuan',
  templateUrl: 'shaixuan.html',
})
export class ShaixuanPage {
  //加载图片
  Gengduo_img = AppConfig.ggengDuo_img;
  custom=[];
  fixed=[];
  ids=[];
  newIds=[];
  num:any;
  id:any;
  isShow=true;
  showUserImg = false;
  showMenu = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,) {
  }

  ionViewDidLoad() {
    this.storage.get('userinfo').then((val) => {
      if (val) {
        if (val.role.name =="Manager Director" ){
             this.isShow=false;
        }        
      } else {
       
      }
    });
    this.getList();
    this.ids.length=0;
  }


getList(){
  this.httpService.get(AppConfig.API.screenList).subscribe(res => {
    console.log(res)
    let code = res.code
    if (code === 100000) {
      this.custom = res.data.custom;
      this.fixed = res.data.fixed;
    } else {
      this.httpService.showToast(res.msg, '');
    }
  }, error => {
    this.httpService.dismissLoading();
    this.httpService.showToast('请检查参数或路径是否正确');
  });
}


submit(id){
    var index = this.ids.indexOf(id);
    this.num= index >= 0 ? false :true; 
   if(index>=0){
     this.ids.splice(index,1)
   }else{
     this.ids.push(id)
   }
  console.log(this.ids);
}
  button(id){
    if (this.ids.length > 0) {
      var index = this.ids.indexOf(id);
      this.num = index >= 0 ? false : true;
      return this.num;
    }else{
      return true;
    }
   
  }

 buttons(id){
   if (this.ids.length > 0) {
     var index = this.ids.indexOf(id);
     this.num = index >= 0 ? true : false;
     return this.num;
   }
 }


  next(){
    this.navCtrl.push(AddShaixuanPage,{'list':this.ids})
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
