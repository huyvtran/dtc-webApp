import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { NgModule }  from '@angular/core';
import { AppConfig } from '../../../app/main'
import { TabsPage } from '../../tabs/tabs'
import { ForgetPage } from '../forget/forget';
import { PhoneverifyPage} from '../phoneverify/phoneverify';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { window } from 'rxjs/operators/window';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})



export class LoginPage {
  show = 1;
  public loginForm: FormGroup;
  username: any;
  password: any;
  yzm: any;
  newpassword: any;
  datainfo = {};
  userId: any;
  userdata: any;
  //加载图片
  logo_img_path = AppConfig.logo_img;
  name_img_path = AppConfig.username_img;
  pass_img_path = AppConfig.password_img;
  version = AppConfig.version;
  userInfo = {username: '' ,password: ''}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl:ModalController,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
  ) {
   
  }

  ionViewDidLoad() {
    
    this.storage.get('usertel').then((val) => {
      if(val){
         this.userInfo.username = val;
      }
   });

  }




  // 登录
  logIn(){

    if(!this.userInfo.username){
      this.httpService.showToast('请填写手机号');
      return;
    }
    
    if(!this.userInfo.password){
      this.httpService.showToast('请填写密码');
      return;
    }
    
    this.httpService.post(AppConfig.API.loginUrl,this.userInfo).subscribe(res => {
      let self=this
      console.log(res)
      let code = res.code
      if (code === 100000) {
        if(!res.data.role){
          this.httpService.showToast('您的账号角色异常，请联系后台管理员重置账号角色。');
          return;
        }

        this.storage.set('usertel',self.userInfo.username);
        this.storage.set('userinfo',res.data);        
        var headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 'X-Security-token': res.data.token });
        var options = new RequestOptions({ headers: headers });
        this.httpService.options = options;    
        this.httpService.getContent(function (res) {       
          if (res.code === 100000) {
              self.httpService.modalTo(TabsPage);  
          } 
        })    
       } else {
        this.httpService.showToast(res.msg,'');
      }
    },error =>{
        this.httpService.dismissLoading();
      this.httpService.showToast('请检查网络连接，并在设置中允许Harmony访问蜂窝移动数据');
    });   
  }
  



  // 忘记密码
  forgetPass(){
      this.navCtrl.push(ForgetPage);
  }

  // 认证
  certification(){
     this.navCtrl.push(PhoneverifyPage);
  }


}
