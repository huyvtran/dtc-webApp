import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';

import { Events } from 'ionic-angular';
import { AppConfig } from '../../../app/main'
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { ProductPage } from '../../products/product/product';
import { ProductListPage } from '../product-list/product-list';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  //标题
  title = '产品详情';
  showUserImg = false;
  showMenu = true;
  //接收数据
  merchand = {};
  Id:number;
  //接收循环图片
  merImage = [];
  memberId:any;
  //价格
  price:string;
  customerId: any;
  isCustomer: any;
  customer: '';
  scork:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
    public events: Events
  ) { }
  publishEvents() {
    this.events.publish('number:shopping', Date.now());
  }
  ionViewWillLeave() {
    //隐藏
    this.title = ' '; 
    this.showMenu = false;
  }
  ionViewWillEnter (){
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.memberId = res.data.id;
        self.ionView(self.memberId);
      }
      console.log(self.memberId)
    })
    this.title = '产品详情';
    this.showMenu = true;
    

    var cusId = this.navParams.get('customerId');
    var cus = this.navParams.get('customer');
    var iscus = this.navParams.get('isCustomer');
    if (cusId && cus) {
      this.customerId = cusId;
      this.customer = cus;
      this.isCustomer = iscus;
    } else {
      this.customerId = 0;
      this.isCustomer = 0;
    }
    

  }
  //调用接口的方法
  ionView(employeeId){
    this.httpService.get(AppConfig.API.merchandDetails + this.navParams.get('id')+'/'+ employeeId).subscribe(res=>{
      console.log(res);
      // 给code赋值
      let code = res.code;
      // 进行判断
      if( code === 100000){
        //给merchand赋值 
        this.merchand = res.data;
        this.Id=res.data.id;
        this.merImage = res.data.productPictureList;
        let a = res.data.productMemberPrice / 100;
        this.price = a.toFixed(2);
        this.scork = res.data.saleStock;
        console.log(this.merchand);
        console.log(this.merImage);
      }
    }),error=>{
      this.httpService.dismissLoading();
      this.httpService.showToast("请检查参数或路径是否正确")
    }
  }


  addShopping(){ 
    console.log(this.scork)
    if (this.scork <= 0){
      this.httpService.showToast('该商品库存为不足,不能添加购物车');
      return;
    }
    let data={
      memberId: this.memberId,
      productId: this.Id,
      customerName: this.customer,
      customerId: this.customerId,
      isCustomer: this.isCustomer,
      counts:1,
      channel:3
    }
    console.log(data);
    let self=this;
    this.httpService.addShopping(data,function (res) {
      console.log(res);
      if (res.code === 100000) {
        self.httpService.showToast("成功加入购物车");
        self.publishEvents();
      }   
    })
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

}
