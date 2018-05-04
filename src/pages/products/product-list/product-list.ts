import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductClassifyPage } from '../product-classify/product-classify'
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main'
import { Storage } from '@ionic/storage';
import { ProductPage } from '../../products/product/product';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  //标题
  title = '产品中心';
  showUserImg = false;
  showMenu = true;
  loadMore: boolean = true;
  allChecked: any;
  pageId = 1;
  status=0;
  //加载图片
  Fenlei_img = AppConfig.classiFication_img;
  search_img = AppConfig.search_img;
  GouWuCar_img = AppConfig.gouWucar_img;

  //接受数据
  merchandisetData = [];
  //接收当前的id
  currentId:String;

  // 未找到
  showNOFind:boolean = false;
  //接受当前搜索框输入的文本
  text:String;
  memberId:any;
  customerId:any;
  customer:'';
  isCustomer:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
    public events: Events
  ) {}

  publishEvents() {
    this.events.publish('number:shopping',Date.now());
  }
  
  ionViewWillLeave() {
    //隐藏
    this.title = ' ';
    this.showMenu = false; 
    this.storage.remove('status')
    this.status = 0;   
  }
  ionViewWillEnter (){
    this.status=0;
    this.title = '产品中心';
    this.showMenu = true;
    this.merchandisetData=[];
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.memberId = res.data.id;
        self.ionMerchand(self.memberId,1,function(){
        });
      }
      console.log(self.memberId)
    })
    
    this.storage.get('status').then((val) => {
      if (val) {
       this.status = val.sta;      
      }else{
        this.status = 0; 
      }
    });

    var cusId = this.navParams.get('customerId');
    var cus = this.navParams.get('customer');
    var iscus = this.navParams.get('isCustomer');
    console.log(cusId, cus, iscus)
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
  ionMerchand(employeeId, pageId, calback){
     let id=this.navParams.get("id");
     var data;
    console.log(this.status)
    if (this.status == 0) {
      data = {
        "companyId": 36,
        "categoryOneId": id,
        "employeeId": employeeId,
        "channel": "app",
        "page": pageId,
        "pageSize": 10,
        "sortBy":"product_type,create_time",
        "sortMethod":"asc"
      };
    } else if (this.status == 1){
      data = {
        "companyId": 36,
        "employeeId": employeeId,
        "channel": "app",
        "page": pageId,
        "pageSize": 10,
        "sortBy":"product_type,create_time",
        "sortMethod":"asc"
      };   
    }
        

    console.log(data);
    this.httpService.posts(AppConfig.API.merchandisetList,data).subscribe(res => {
      console.log(res.data);
      let code = res.code;
      if(code === 100000){
        if (res.data.data.length > 0) {
          for (let i in res.data.data) {
            var a = res.data.data[i].productMemberPrice;
            var b = a / 100;
            res.data.data[i].productMemberPrice = b.toFixed(2);
          }
          console.log(a, b, res.data.data)
          this.merchandisetData = this.merchandisetData.concat(res.data.data);

        }
        if (res.data.data.length == 0 && pageId != 1){
          this.loadMore = false;
          this.httpService.showToast('暂无更多');
        }else{
          this.loadMore = true;
        }
        calback && calback();  
        this.storage.remove('status')  
      }else{
        this.storage.remove('status')
        this.loadMore = false;
        this.httpService.showToast(res.msg, '');
      }
    },error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }
  //搜索
  ionSearch() {
    let id = this.navParams.get("id");

    var data;
    if (this.status == 0) {
      data = {
        "searchKey": this.text,
        "categoryOneId": id,
        "employeeId": this.memberId,
        "channel": "app",
        "sortBy":"product_type,create_time",
        "sortMethod":"asc"
      };
    } else if (this.status == 1) {
      data = {
        "searchKey": this.text,
        "employeeId": this.memberId,
        "channel": "app",
        "sortBy":"product_type,create_time",
        "sortMethod":"asc"
      };
    }

    this.httpService.posts(AppConfig.API.merchandisetList, data).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code === 100000) {
        for (let any in res.data.data) {
          var a = res.data.data[any].productMemberPrice;
          var b = a / 100;
          res.data.data[any].productMemberPrice = b.toFixed(2);
        }
        this.merchandisetData = res.data.data;
        if (this.merchandisetData.length == 0) {
          this.showNOFind = true;
        } else {
          this.showNOFind = false;
        }
        this.storage.remove('status')
      } else {
        this.storage.remove('status')
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }

  addShopping(id,type) {
    
    console.log(type)
    if(type.saleStock <= 0){
      this.httpService.showToast('该商品库存为不足,不能添加购物车');
      return;
    }
    let data = {
      memberId: this.memberId,
      productId: id,
      customerName: this.customer,
      customerId: this.customerId,
      isCustomer: this.isCustomer,
      counts: 1,
      channel: 3
    }
    console.log(data);
    let self = this;
    this.httpService.addShopping(data, function (res) {
      console.log(res);
      if (res.code === 100000) {
        self.httpService.showToast("成功加入购物车");
        self.publishEvents(); 
      }
    })
  }


  // 下拉刷新
  doRefresh(refresher) {
    let self = this;
    this.pageId=1;
    this.loadMore = false;
    this.merchandisetData=[];
    this.ionMerchand(self.memberId,1, function () {
      refresher.complete();
    });
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    let self = this;
    this.allChecked = false;
    this.pageId++
    this.ionMerchand(self.memberId, this.pageId, function () {
      infiniteScroll.complete();
    });
  }

  toProductDetail(item) {
    this.currentId = item.id;
    this.navCtrl.push(ProductDetailPage,{"id":this.currentId,
      "customerId": this.customerId,
      "customer": this.customer,
      "isCustomer": this.isCustomer
  })
  }
  toProductClassify(){
    this.navCtrl.push(ProductClassifyPage);
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
