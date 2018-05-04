import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../../app/main'
import { SetpassPage } from '../setpass/setpass';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  username: any;
  yzm: any;

  logo_img_path = AppConfig.logo_img;
  name_img_path = AppConfig.username_img;
  code_img_path = AppConfig.code_img;

  userInfo = { username: '', yzm: '' }

  id:any;
  name:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  
  
  // 获取验证码
  getYZM() {
    let data = {
      'tel': this.userInfo.username
    }
    this.httpService.posts(AppConfig.API.getyzmUrl,data).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code === 100000) {
       
      } else {
        this.httpService.showToast(res.msg, '');
      }
    })
    var yzm = document.getElementsByClassName('getyzm')[0];
    var countdown = 60;
    function settime(val) {
      if (countdown == 0) {
        val.removeAttribute("disabled");
        val.innerHTML = "获取验证码";
        countdown = 60;
        return false;
      } else {
        val.setAttribute("disabled", true);
        val.innerHTML = "发送中(" + countdown + ")";
        countdown--;
      }
      setTimeout(function () {
        settime(val);
      }, 1000);
    }
    settime(yzm);
  }
  
  Authentication() {
    let data = {
      tel: this.userInfo.username,
      code: this.userInfo.yzm
    }
    this.httpService.posts(AppConfig.API.authentication, data).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code === 100000) {
        this.id=res.data.id;
        this.name=res.data.username;
        this.navCtrl.push(SetpassPage,{
          "id": this.id,
          "name":this.name
        });
      } else {
        this.httpService.showToast(res.msg, '');
      }
    })
  }


  jump() {
    if (!this.userInfo.username) {
      this.httpService.showToast('请填写手机号码');
      return;
    }
    if (!this.userInfo.yzm) {
      this.httpService.showToast('请填写验证码');
      return;
    }
    this.Authentication()
  }

  // 返回
  back(){
      this.navCtrl.pop();
  }

}
