import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../app/main';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SetupPage } from '../setups/setup/setup';
/**
 * Generated class for the ModifyPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-modify-password',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {
  title = '修改密码';
  showMenu=true;
  id:any;
  username:any;
  userInfo = {pwd:'', password: '', newpassword: '' }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage, ) {
  }
  ionViewWillLeave (){
    this.title = ' ';
    this.showMenu=false;
  }
  ionViewWillEnter () {
    this.title = '修改密码';
    this.showMenu = true;
    this.storage.get('userinfo').then((val) => {
      if (val) {
        this.id=val.id;
        this.username=val.username;
        console.log(val)
      } else {
       
      }
    });
  }

  setpwd() {
    let data = {
      id: this.id,
      username:this.username,
      oldPassword: this.userInfo.pwd,
      pwd: this.userInfo.password,
      password: this.userInfo.newpassword
    }
    console.log(data)
    if (!this.userInfo.pwd) {
      this.httpService.showToast('请输入原密码');
      return;
    }
    if (!this.userInfo.password) {
      this.httpService.showToast('请输入新密码');
      return;
    }
    if (this.userInfo.password) {
      if (!(/^((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d].{5,13})+$/.test(this.userInfo.password))){
        this.httpService.showToast('密码位数为6-14位，至少要有1个字母');
       return;
      }     
    }
    if (!this.userInfo.newpassword) {
      this.httpService.showToast('请确认密码');
      return;
    }
    if (this.userInfo.password != this.userInfo.newpassword) {
      this.httpService.showToast('2次输入的新密码不同，请重新输入');
      return;
    }

    this.httpService.post(AppConfig.API.modifyPassword, data).subscribe(res => {
      console.log(res);
      if (res.code === 100000) {
        this.navCtrl.push(SetupPage)      
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }

}
