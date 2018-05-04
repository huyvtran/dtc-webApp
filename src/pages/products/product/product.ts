import { Component } from '@angular/core';
import { LoginPage } from './../../log_in/login/login';
// import { Http, Response } from '@angular/http';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';  
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

import {ProductListPage} from '../product-list/product-list'
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  //标题
  title = '产品中心';
  showUserImg = true;
  showMenu = true;

  //接收数据
  listData = [];
  //获取id
  listId: String;
  //加载图片
  head_pash_img = AppConfig.head_img;
  customerId: any;
  customer: '';
  isCustomer: any;
  message = {
    headImg: ''
  };
  
  //依赖注入
  constructor(
    public navCtrl: NavController,
    private app:App, 
    private httpService: HttpServiceProvider,
    private storage: Storage,
    public events: Events
   ) { }
   
   ionViewWillLeave(){
    //隐藏
    this.title = '';
    this.showMenu = false;

   }
  //调用接口
  ionViewWillEnter() {
    this.title = '产品中心';
    this.showMenu = true;
    this.storage.get('customerId').then((val) => {
      console.log(val)
      if (val) {
        this.customerId = val.id;
        this.customer = val.username;
        this.isCustomer = 1;
        console.log(val);
        this.storage.remove('customerId');
      } else {
        this.customerId = 0;
        this.isCustomer = 0;
        this.storage.remove('customerId');
      }
    });

    let self = this;
    // this.httpService.getContent(function (res) {
    //   if (res.code === 100000) {
    //     var data = res.data;
    //     self.showMessage(data)
    //   }
    // })
    // 调用接口
    this.ionView();
    this.publishEvent();
  }

  showMessage(data) {
    // 获取会员信息          
    this.message = data;
    if (!data.headImg) {
      this.message.headImg = AppConfig.head
    } else {
      this.message.headImg = data.headImg
    }
  }

  publishEvent() {
    this.events.publish('number:shopping', Date.now());
  }
  //调用接口的方法
  ionView(){
    this.httpService.get(AppConfig.API.classiFication).subscribe(res=>{
      console.log(res);
      //给code赋值
      let code = res.code;
      // 进行判断
      if( code === 100000){
        //给listData赋值
        this.listData = res.data;
        console.log(this.listData)
      } else if (res.code === 0) {
        this.httpService.modalTo(LoginPage);
      }
     
    }),error=>{
      this.httpService.dismissLoading();
      this.httpService.showToast("请检查参数或路径是否正确")
    }
  }
    //获取当前点击的id
    ionCid(item){
      console.log(item);
      //跳转页面  
      this.navCtrl.push(ProductListPage,{"id":item,
        "customerId": this.customerId,
        "customer": this.customer,
        "isCustomer": this.isCustomer
    });
    }


  //跳转页面
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  //跳转页面
  settings() {
    this.navCtrl.push(SetupPage)
  }
  //跳转页面
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }
}
