import { ProductDetailPage } from './../product-detail/product-detail';
import { ProductListPage } from './../product-list/product-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main'
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProductClassifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-classify',
  templateUrl: 'product-classify.html',
})
export class ProductClassifyPage {
  //标题
  title = '产品分类';
  pet = 1;
  //接受数据
  datalist = [];

  isAll = false;
  ids=[];

  //接受index判断是否添加class名
  folderstatus = {};

  //不知道作用
  dataChild = [];

  // 三级分类
  dataChildThree = [];
  dataChildThree1 = [];
  dataChildThreeProductVo = [];

  liLength = [];
  list = [];
  show = false;
  showUserImg = false;
  showMenu = true;

  employeeId;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
  ) {
  }
  ionViewWillLeave() {
    //隐藏
    this.title = ' ';
    this.showMenu = false;

  }
  //调用方法
  ionViewWillEnter() {
    this.title = '产品分类';
    this.showMenu = true;
    this.list=[];
    this.folderstatus={};

    var self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.employeeId = res.data.id;
        self.getMessage(self.employeeId);
      }
      
    })
    

    
  }

  getMessage(employeeId) {
    this.httpService.get(AppConfig.API.classiFication).subscribe(res => {
      let code = res.code;
      //进行判断
      if (code === 100000) {
        //给products赋值
        this.datalist = res.data;
        this.folderstatus[0] = true;
        this.dataChild = this.datalist[0].productVo; 
        console.log(res.data)
        console.log(this.dataChild);  
        this.getM(this.dataChild,employeeId);
      }
    }), error => {
      this.httpService.dismissLoading();
      this.httpService.showToast("请检查参数或路径是否正确")
    }
  }


  getM(dataChild,employeeId){
    console.log(dataChild);
    if (dataChild.length > 0) {
      for (let i = 0; i < dataChild.length; i++) {
        this.getMore(dataChild[i].id,employeeId)
      }
    }   
  }

  getMore(id,employeeId) {
    console.log(id);
    let data = {
      "companyId": 36,
      "categoryTwoId": id,
      "employeeId":employeeId,
      "channel":"app"
    };
    console.log(data);
    this.httpService.posts(AppConfig.API.merchandisetListPublic, data).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code === 100000) {        
        if (res.data.data) {
          this.show = true;
          for (let i = 0; i < res.data.data.length; i++) {
            var a = res.data.data[i];
            var b = { id: a.id, categoryTwoId: a.categoryTwoId, productSimplifyName: a.productSimplifyName } 
            this.list.push(b);           
           }
          console.log(this.list);
        }
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })

  }

  ifyList(id) {
    this.navCtrl.push(ProductDetailPage, { 'id': id })
  }

  classifyActiva(i,item){
    this.folderstatus = {};
    this.folderstatus[i] = true;
    this.dataChild = [];
    this.list=[];
    console.log(item);
    this.dataChild = item.productVo;
    console.log(this.dataChild);
    this.getM(this.dataChild,this.employeeId);
  }

pop(){
  var status = {
    'sta':1
  }
  this.storage.set('status',status);
  this.navCtrl.pop()
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
