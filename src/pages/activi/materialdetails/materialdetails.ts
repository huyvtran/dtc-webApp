import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';


import { AppConfig } from '../../../app/main'
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { ProductPage } from '../../products/product/product';


/**
 * Generated class for the MaterialdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materialdetails',
  templateUrl: 'materialdetails.html',
})
export class MaterialdetailsPage {
  //标题
  title = '产品详情';
  //接收数据
  merchand = {};
  Id: number;
  //接收循环图片
  merImage = [];
  memberId: any;
  //价格
  price: string;
  customerId: any;
  isCustomer: any;
  customer: '';
  showUserImg = false;
  showMenu=true;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,) {
  }

  ionViewWillLeave() {
    //隐藏
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.showMenu = true;
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.memberId = res.data.id;
      }
      console.log(self.memberId)
    })
    this.title = '产品详情';
    this.ionView();
    console.log(this.navParams.get('id'));

  }
  //调用接口的方法
  ionView() {
    this.httpService.get(AppConfig.API.merchandDetails + this.navParams.get('id')).subscribe(res => {
      console.log(res);
      // 给code赋值
      let code = res.code;
      // 进行判断
      if (code === 100000) {
        //给merchand赋值 
        this.merchand = res.data;
        this.Id = res.data.id;
        this.merImage = res.data.productPictureList;
        let a = res.data.productMemberPrice / 100;
        this.price = a.toFixed(2);
        console.log(this.merchand);
        console.log(this.merImage);
      }
    }), error => {
      this.httpService.dismissLoading();
      this.httpService.showToast("请检查参数或路径是否正确")
    }
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
