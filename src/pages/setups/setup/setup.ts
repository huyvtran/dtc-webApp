import { LoginPage } from './../../log_in/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main'
import { ChangeAvatarPage } from '../../change-avatar/change-avatar';
import { ModifyPasswordPage } from '../../modify-password/modify-password';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  //标题
  title = "设置";
  version = AppConfig.version;

  company:any;
  userInfo=[];
  message={
    headImg: ''
  };
  id:"";
  show=true;
  showUserImg = false;
  showMenu = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,  
  ) { 
   
  }
  ionViewWillLeave (){
    //隐藏
    this.title = '';
    this.showMenu = false;

  }

  ionViewWillEnter () {
    this.title = '设置';
    this.showMenu = true;
    // 获取会员信息
    let self=this;
    this.httpService.getContent(function(res){
      if (res.code === 100000) {
            var data = res.data;
             self.id= res.data.id;
             self.showMessage(data)
          }
    })
     
  }

  showMessage(data){
    // 获取会员信息
        if (data.ticket){
            data.ticket = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + data.ticket;        
        }else{
            this.show=false;
        }   
    this.message=data;
    // if (!data.headImg){
    //   this.message.headImg = AppConfig.head
    // }else{
    //   this.message.headImg = data.headImg
    // }
       
           
  }

  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }
  
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }

  changeavatar(){
    this.navCtrl.push(ChangeAvatarPage,{img:this.message.headImg,id:this.id})
  }

  modifypassword(){
    this.navCtrl.push(ModifyPasswordPage)
  }

  signout(){
    this.httpService.showToast('退出成功');
    // this.storage.remove('userinfo');
    this.httpService.modalTo(LoginPage);  
  }

}
