import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddShaixuanPage } from './../add-shaixuan/add-shaixuan';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
import { FilterCustomersPage } from '../../test/filter-customers/filter-customers';

/**
 * Generated class for the FiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  title = '筛选条件';

 //加载图片
 Gengduo_img = AppConfig.ggengDuo_img;
 custom=[];
 fixed=[];
 ids=[];
 newIds=[];
 num:any;
 id:any;
 isShow=true;
 list=[];
 showUserImg = false;
 showMenu = true;
constructor(public navCtrl: NavController, public navParams: NavParams,
  private httpService: HttpServiceProvider,
  private storage: Storage) {
}
ionViewWillLeave(){
  this.title = ' ';
  this.showMenu = false;
}

ionViewWillEnter () {
  this.title = '筛选条件'; 
  this.showMenu = true;
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
  this.show()
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
  this.storage.set('labels', JSON.stringify(this.ids));//存储本地数据
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

 show(){
   this.list=this.navParams.get('name');
   console.log(this.list)
 }



 //跳转回上一个页面
  next(){
    // this.navCtrl.pop();
    this.navCtrl.push(FilterCustomersPage, { "labels": this.ids, "list": this.navParams.get('list'), "nList": this.navParams.get('nList')});
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
