import { AddCustomerPage } from './../../customer/add-customer/add-customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { AlertController } from 'ionic-angular';
import { ChoiceCustomerPage } from '../../customer/choice-customer/choice-customer';
import { TestPage } from '../../../pages/test/test';
import { timestamp } from 'rxjs/operator/timestamp';
import { BindingFlags } from '@angular/core/src/view';
/**
 * Generated class for the ReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
  text = " ";
  listCustomer=[];
  flag:any;
  //标题
  title = "创建提醒";
  s=true;
  x=false;
  length=0;
  showUserImg=false;
  showMenu = true;

  //存储取出的当前用户的id和姓名
  list = [{"id":this.navParams.get('id'),"username":this.navParams.get('username')}];
  myDate:any;
  currentId:String = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    public alertCtrl: AlertController) {
  }
  ionViewWillLeave(){
    //隐藏
    this.title = '';
    this.showMenu = false;
  }
  //进入页面就会执行的方法
  ionViewWillEnter() {
    this.showMenu = true;
    console.log(this.list)
    if (this.navParams.get('id') && this.navParams.get('username')){
       this.s=false;
       this.x=true; 
       this.list = [{"id":this.navParams.get('id'),"username":this.navParams.get('username')}]
       this.length=1;
    }

    this.storage.get('filterFlag').then((fg) => {
      console.log(fg);
      this.flag = fg;
    });

    this.storage.get('filterList').then((val) => {      
      console.log(this.list);
      if (this.flag == true) {
        this.list = [];
        this.length=0;
        this.storage.remove('filterFlag');    
      }else {
        if (val && val.length > 0) {
          this.list = [];
          this.length=0;
          console.log(val);
          for (let i = 0; i < val.length; i++) {
            this.list.push(val[i]);
            this.length = this.list.length;
            this.storage.remove('filterList');
          }

          for (let i = 0; i < this.list.length; i++) {
            this.currentId += this.list[i].id + ',';
            console.log(this.currentId);
          }
          console.log(this.list)
        }  
      }
      
    });


  }
  ionViewDidLoad(){
    this.title = '创建提醒';
    //当前的日期
    let a = this.navParams.get('currentDay');
    var tempDate = a.split("-");
    var year = tempDate[0];
    var month = tempDate[1];
    var day = tempDate[2];

    let m;
    let d;
    m = month < 10 ? "0" + month : month;
    d = day < 10 ? "0" + day : day;

    this.myDate = year + '-' + m + '-' + d + 'T' + "00" + ':' + "00" + ':' + '00+08:00';
    console.log(this.myDate)
  }


  establish(){
    var temp = [];
      for(let i=0; i<this.list.length; i++){
       temp.push(this.list[i].id);
      }

      this.currentId= temp.join(',');

    //事件提醒
    if(this.text == ' '){
      this.httpService.showToast('请填提醒内容');
      return;
    }
    //时间提醒
    if(!this.myDate){
      this.httpService.showToast('请填写提醒时间');
      return
    }
    //客户提醒
    if(!this.currentId){
      this.httpService.showToast('请选择客户');
      return
    }
    //这是传给后台的时间
    // this.timeStamp = this.myDate;
    let data={
      "noticeEvent": this.text, //提醒事件
      "noticeTime": this.myDate, //此处传unix事件戳也可以，但必须是毫秒级别
      "memberIds": this.currentId, //此处为逗号分隔的字符串
      "noticeTimestamp":this.myDate
    }
    console.log(data);

    this.httpService.post(AppConfig.API.reminderUrl,data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.httpService.showToast('提醒创建完成');
        this.navCtrl.pop();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    }); 
    
  }

  //跳转页面（右侧三个小图标）
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }


  //跳转选择客户页面
  showCheckbox(){
    console.log(this.list);
    this.navCtrl.push(ChoiceCustomerPage, { list:this.list, resolve: this.callback })
  }

  callback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.list=[];
      for(let i=0;i<data.length;i++){
        var a = { id: data[i].id, username: data[i].username};
        this.list.push(a);
      }     
      this.length = this.list.length;
      for (let i = 0; i < this.list.length; i++) {
        this.currentId += this.list[i].id + ',';
        console.log(this.currentId);
      }
      this.flag = true;
      resolve();
    });
  }



}
