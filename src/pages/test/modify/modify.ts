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
/**
 * Generated class for the ModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {
  //事件信息
  text: "";
  //跟进记录
  texts: "";
  //渲染页面
  listCustomer = [];
  //获取上个页面的本地储存
  list = [];
  //传入的当前用户的id
  ids:'';
  idws=[];
  newList=[];
  //当期的时间
  myDate:any;
  //标题
  title = "修改提醒";
  showUserImg = false;
  showMenu = true;
  length=0;
  news=[];
  newIds=[];
  w=false;
  s=true;
  flag: any;
 


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    public alertCtrl: AlertController) {
  }
  //隐藏
  ionViewWillLeave (){
    this.title = ' ';
    this.showMenu = false;
  }

  ionViewWillEnter() {
   this.showMenu = true;
    this.title = '修改提醒';
    //回显
    if (this.navParams.get('username')) {
      this.s = false;
      this.w = true;
    }
    this.storage.remove('filterList');
    this.storage.get('filtersFlag').then((fg) => {
      console.log(fg);
      this.flag = fg;
    });
    
    this.storage.get('filtersList').then((val) => {
      console.log(this.list);  
      if (this.flag == true) {
        this.list = [];
        this.newIds = [];
        this.length = 0;
        this.storage.remove('filtersFlag');
      } else {
        if (val && val.length > 0) {
          this.list = [];
          this.newIds = [];
          this.ids = '';
          console.log(val);
          for (let i = 0; i < val.length; i++) {
            this.list.push(val[i].username);
            this.length = this.list.length;
            this.ids += val[i].id + ',';
            this.newIds.push(val[i].id);
            this.storage.remove('filtersList');
          }
          console.log(this.list, this.ids, this.newIds)
        }
      }
     

    });

     

  }
  ionViewDidLoad(){
    this.display();
  }
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }



//回显
  display(){ 
    this.ids = '';
    let id = this.navParams.get('id');
    this.httpService.get(AppConfig.API.display + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.texts = res.data.followRecord;
        this.text = res.data.noticeEvent;
     
        //当前的日期
        let currentDate = new Date(res.data.noticeTimestamp);
        let year =  currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        let hh = currentDate.getHours();
        let mm = currentDate.getMinutes();

        let m;
        if(month < 9){
          m = "0" + month;
        }else{
          m = month;
        }

        let d;
        if(day < 9){
          d = "0" + day;
        }else{
          d = day;
        }

        let h;
        if(hh < 9){
          h = "0" + hh;
        }else{
          h = hh;
        }

        let s;
        if(mm < 9){
          s = "0" + mm;
        }else{
          s = mm;
        }

        res.data.noticeTimestamp = year + '-' + m + '-' + d+'T'+h+':'+s+':'+'00+08:00';
        
        this.myDate = res.data.noticeTimestamp;
        console.log(this.myDate); 
       
        this.ids = res.data.memberIds;       
        var name= res.data.memberNames;
        this.newIds = this.ids.split(",");
        this.list =name.split(",");

        this.length = this.list.length;

        console.log(this.list);
      } else {
        this.httpService.showToast(res.msg, '');  
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  establish() {
    if (!this.text) {
      this.httpService.showToast('请填提醒内容');
      return;
    }
    if (!this.myDate) {
      this.httpService.showToast('请填写提醒时间');
      return;
    }
    if (this.list.length == 0) {
      this.httpService.showToast('请选择客户');
      return;
    }
    let id = this.navParams.get('id');    
    console.log(this.ids)
    let data = {
      "noticeEvent": this.text, //提醒事件
      "noticeTime": this.myDate, //此处传unix事件戳也可以，但必须是毫秒级别
      "memberIds": this.ids, //此处为逗号分隔的字符串
      "noticeTimestamp":this.myDate, //具体的时间
      "followRecord": this.texts //跟进记录（可为空）
    }
    console.log(data);
    this.httpService.put(AppConfig.API.update + id, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.storage.remove('filtersList');
        this.navCtrl.pop();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  
  showCheckbox() {
    console.log(this.newIds);
    this.navCtrl.push(ChoiceCustomerPage, { nList: this.newIds, resolve: this.callback })
  }
  callback = (data) => {
    return new Promise((resolve, reject) => {  
      console.log(data);
        this.list = [];  
        this.newIds=[];      
        this.ids='';
        this.length=0;
        for (let i = 0; i < data.length; i++) {
          var name = data[i].username;
          var id = data[i].id;
          this.list.push(name);
          this.length = this.list.length;
          this.newIds.push(id+'');
          for (let i = 0; i < this.newIds.length;i++){
            var a = this.newIds[i];
            this.ids += a + ',';
          }       
        console.log(this.list,this.ids);
      }  
      this.flag = true;
      resolve();
    });
  }

}
