import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../../app/main';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the SetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-setpass',
  templateUrl: 'setpass.html',
})
export class SetpassPage {
  show = 1;
  public loginForm: FormGroup;
  username: any;
  password: any;
  yzm: any;
  newpassword: any;
  datainfo = {};
  userId: any;
  userdata: any;
  vals:any;

  userInfo = { password: '', newpassword: '' }

  logo_img_path = AppConfig.logo_img;
  code_img_path = AppConfig.code_img;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,) {
  }

  ionViewDidLoad() {
   
  }

 // 忘记密码
  setpwd() { 
    let data = {
      id: this.navParams.get('id'),
      username: this.navParams.get('name'),
      password: this.userInfo.password,
      pwd:this.userInfo.newpassword
    }
    console.log(data)
    if (!this.userInfo.password){
      this.httpService.showToast('请输填写密码');
      return;
    }
    if (this.userInfo.password) {
      if (!(/^((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d].{5,13})+$/.test(this.userInfo.password))) {
        this.httpService.showToast('密码位数为6-14位，至少要有1个字母');
        return;
      }
    }
    if (!this.userInfo.newpassword) {
      this.httpService.showToast('请再次填写密码');
      return;
    }
    if (this.userInfo.password != this.userInfo.newpassword ) {
      this.httpService.showToast('2次输入的新密码不同，请重新输入');
      return;
    }
   
   
    this.httpService.post(AppConfig.API.fortpasswordUrl, data).subscribe(res => {
        console.log(res);
        if (res.code === 100000) { 
           this.back();
        } else{
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('请检查参数或路径是否正确');
      })
    }


  back(){
    this.navCtrl.push(LoginPage);
  }

}
