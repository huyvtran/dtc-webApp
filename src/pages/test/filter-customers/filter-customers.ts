import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FiltersPage } from '../../customer/filters/filters';
import { List } from 'ionic-angular/components/list/list';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { AppConfig } from './../../../app/main';
import { TestPage } from '../../test/test';
import { ReminderPage } from '../../test/reminder/reminder';
import { removeArrayItem } from 'ionic-angular/util/util';


/**
 * Generated class for the FilterCustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-customers',
  templateUrl: 'filter-customers.html',
})
export class FilterCustomersPage {
  //标题
  title = '选择客户';
  showUserImg=false;
  showMenu = true;
  //加载图片
  Jiantou_img = AppConfig.jianTou_img;
  avatar_img = AppConfig.head;

  //接受数据，在页面循环出来
  listCustomer=[];

  //存储选中的对象
  list=[];
  nList=[];
  submits = [];
  allChecked:any;
  newList=[];
  a:any;
  //判断是否全选的状态
  checkedAll = false;
  //判断单个是否选中的状态
  checkeda = false;

  //用来接收本地存储的数据
  label = this.navParams.get('labels');
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }
  //页面离开执行
  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
    
  }
  //页面进来执行
  ionViewWillEnter (){
    this.storage.remove('filterList')
    this.title = '选择客户';
    this.showMenu = true;
    this.showCheckbox();  
  }
  //开始就会加载
  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterCustomersPage');
  }

    //接口的调用
  showCheckbox() {  
    let data={ 
        memberTagList: this.label
      }
      console.log(data)
      this.httpService.post(AppConfig.API.chooseCustomers,data).subscribe(res => {
        console.log(res.data);   
        this.listCustomer = res.data;
        this.list = this.navParams.get("list");
        this.nList = this.navParams.get("nList");

        console.log(this.list,this.nList)
        if (this.list.length > 0) {
          for (let i = 0; i < this.listCustomer.length; i++) {
            for (let z = 0; z < this.listCustomer[i].list.length; z++) {
              for (let j = 0; j < this.list.length; j++) {
                if (this.listCustomer[i].list[z].id == this.list[j].id) {
                  this.listCustomer[i].list[z].checked = true;  
                  this.list=[];    
                  var a1 = this.listCustomer[i].list[z].id;
                  var b1 = this.listCustomer[i].list[z].username;
                  var c1 = { id: a1, username: b1 };
                  this.list.push(c1);          
                }
              }
            }
          }
        }

        if (this.nList.length > 0) {
          for (let i = 0; i < this.listCustomer.length; i++) {
            for (let z = 0; z < this.listCustomer[i].list.length; z++) {
              for (let j = 0; j < this.nList.length; j++) {
                if (this.listCustomer[i].list[z].id == this.nList[j]) {
                  this.listCustomer[i].list[z].checked = true;
                  this.nList=[];
                  var a = this.listCustomer[i].list[z].id;
                  var b = this.listCustomer[i].list[z].username;
                  var c={id:a,username:b};
                  this.nList.push(c);
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
      this.nList=[];
      this.submits = [];
      for (let i = 0; i < this.listCustomer.length; i++) {
        for (let j = 0; j < this.listCustomer[i].list.length; j++) {
          if (this.listCustomer[i].list[j].checked == true) {
            this.list.push(this.listCustomer[i].list[j]);
            this.nList.push(this.listCustomer[i].list[j]);
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
      this.nList=[];
      if (this.allChecked) {
        for (let i = 0; i < this.listCustomer.length; i++) {
          for (let j = 0; j < this.listCustomer[i].list.length; j++) {
            this.listCustomer[i].list[j].checked = true;
            if (this.listCustomer[i].list[j].checked == true) {
              let a = { id: this.listCustomer[i].list[j].id, username: this.listCustomer[i].list[j].username };
              this.list.push(a);
              this.nList.push(a);
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
    console.log(this.nList);
    this.storage.set('filterList',this.list);
    this.storage.set('filtersList', this.nList);
    if (this.list.length == 0) {
      this.storage.set('filterFlag', true);
    }

    if (this.nList.length == 0) {
      console.log(this.nList);
      this.storage.set('filtersFlag', true);
    }
    this.navCtrl.remove(3,2);
    this.navCtrl.pop();//跳转页面
  }

 
  //头部跳转
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
