import { ReminderPage } from './../../test/reminder/reminder';
import { AppConfig } from './../../../app/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { List } from 'ionic-angular/components/list/list';
import { FiltersPage } from '../filters/filters';
import { TestPage } from '../../test/test';
/**

/**
 * Generated class for the ChoiceCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choice-customer',
  templateUrl: 'choice-customer.html',
})
export class ChoiceCustomerPage {
  title = '选择客户';
  //加载图片
  Jiantou_img = AppConfig.jianTou_img;
  avatar_img = AppConfig.head;
  //接收数据，在页面循环
  listCustomer=[];
  //存储选中的对象
  list=[];
  submits=[];
  newList=[];
  nList=[];
  //判断全选的状态
  checkedAll = false;
  //判断单选的状态
  checkeda = false;
  showUserImg=false;
  showMenu = true;
  //用来接收本地存储的数据
  label:any;
  resolve: any;
  resolveU:any;
  allChecked:any;

  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController ) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter (){
    if (this.navParams.get("nList")) {
      this.nList = this.navParams.get("nList");
      console.log(this.nList)
    }
    this.resolve = this.navParams.get("resolve");
    if (this.navParams.get("list")){
       this.list = this.navParams.get("list");
    }
    console.log(this.list);
    this.title = '选择客户';
    this.showMenu = true;
    this.showCheckbox();
  }
  //接口的调用
  showCheckbox() {  
    console.log(this.list);
    let data={}
    this.httpService.post(AppConfig.API.chooseCustomers, data).subscribe(res => {
      if (res.data) {    
        this.listCustomer = res.data;
      } 
       console.log(this.listCustomer);
      if (this.list.length > 0) {
        for (let i = 0; i < this.listCustomer.length; i++) {
          for (let z = 0; z < this.listCustomer[i].list.length; z++) {
            for (let j = 0; j < this.list.length; j++) {
              if (this.listCustomer[i].list[z].id == this.list[j].id) {
                this.listCustomer[i].list[z].checked = true;
              }
            }
          }
        }
      }
      if (this.nList.length > 0){
        for (let i = 0; i < this.listCustomer.length; i++) {
          for (let z = 0; z < this.listCustomer[i].list.length; z++) {
            for (let j = 0; j < this.nList.length; j++) {
              var id = parseInt(this.nList[j]);
              console.log(id);
              if (this.listCustomer[i].list[z].id == id) {
                this.listCustomer[i].list[z].checked = true;
              }
            }
          }
        }
      }       
        
    })
   }



  pushList(){ 
    console.log(this.listCustomer)
    this.list = [];
    this.submits = [];
    for (let i = 0; i < this.listCustomer.length; i++) {
      for (let j = 0; j < this.listCustomer[i].list.length; j++) {
        if (this.listCustomer[i].list[j].checked == true) {
          this.list.push(this.listCustomer[i].list[j]);
        }
      }
    } 

    for (let i = 0; i < this.listCustomer.length; i++) {
      for (let j = 0; j < this.listCustomer[i].list.length; j++) {
        this.submits.push(this.listCustomer[i].list[j]);
      }
    }
    this.allChecked = this.submits.length == this.list.length ? true : false;   
    console.log(this.list);
  }


  updateCucumber(){
    console.log(this.listCustomer)
    this.list = [];
    if (this.allChecked) {
      for (let i = 0; i < this.listCustomer.length; i++) {
        for (let j = 0; j < this.listCustomer[i].list.length; j++) {
          this.listCustomer[i].list[j].checked = true;       
          if (this.listCustomer[i].list[j].checked == true) {
            let a = { id: this.listCustomer[i].list[j].id, username: this.listCustomer[i].list[j].username };
            this.list.push(a);
          }
        }
      }
    } else {
      for (let i = 0; i < this.listCustomer.length; i++) {
        for (let j = 0; j < this.listCustomer[i].list.length; j++) {
          this.listCustomer[i].list[j].checked = false;
        }
      }
    } 
     console.log(this.list);
  }

  //跳转回创建页面
  trues(){
       console.log(this.list);
       this.resolve(this.list).then((result) => { });
       this.navCtrl.pop();
     
  }
  //跳转筛选客户的页面
  ionFilter(){
    this.navCtrl.push(FiltersPage, { list: this.list, nList:this.nList});
  }
  
  //右侧三个小图标跳转
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
