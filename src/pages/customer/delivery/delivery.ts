import { UpdatePage } from './../update/update';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewaddPage } from '../newadd/newadd';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  title = '收货信息';
  list=[];
  ids:any;
  isShow=true;
  isHide=false;
  show;
  d=true;
  add = true;
  noadd = false;
  showUserImg = false;
  showMenu = true;
  constructor(
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams, ) {
  }
  ionViewWillLeave() {
    this.title = '';
    this.showMenu = false;
  }

  ionViewWillEnter() {
    this.title = '收货信息';
    this.showMenu = true;
    // this.storage.get('userinfo').then((val) => {
    //   if (val) {
    //     if (val.role.name != "DTC Head" && val.role.name != "DTC Sales" && val.role.name != "Marketing Head" && val.role.name != "Marketing"
    //       && val.role.name != "Marketing & HR" && val.role.name != "Training Team Head" && val.role.name != "Trainer"){
    //        this.d=false;
    //      }
    //   } else{

    //   }
    // });

    var clean = this.navParams.get('clean');
    if (clean == true) {
      this.add = false;
      this.noadd = true;
    }
    this.getDetails()
  }


  getDetails() {
    let id = this.navParams.get("id");
    console.log(id)
    this.httpService.get(AppConfig.API.deliveryMessage + id).subscribe(res => {
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


  setup(id){
    let data={
      id:id,
      memberId: this.navParams.get("id")
    }
    this.httpService.post(AppConfig.API.default,data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
         this.getDetails();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


update(id){
  this.navCtrl.push(UpdatePage,{
    'id':id
  })
}
  updates(){
    this.httpService.showToast('您无法更新地址');
    return;
  }


delete(id){ 
   this.httpService.get(AppConfig.API.deleteMessage+id).subscribe(res => {
    console.log(res)
    let code = res.code
    if (code === 100000) {
      this.getDetails();
    } else {
      this.httpService.showToast(res.msg, '');
    }
  }, error => {
    this.httpService.dismissLoading();
    this.httpService.showToast('请检查参数或路径是否正确');
  });
}

  deletes(){
    this.httpService.showToast('您无法删除地址');
    return;
  }



  ionNewAdd(){
    this.navCtrl.push(NewaddPage,{
      'id': this.navParams.get("id")
    });
  }

  ionNewAdds() {
    this.httpService.showToast('您无法添加地址');
    return;
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
