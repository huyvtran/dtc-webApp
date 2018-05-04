import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main'
import { Storage } from '@ionic/storage';
import { ProductPage } from '../../products/product/product';

/**
 * Generated class for the GiftListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gift-list',
  templateUrl: 'gift-list.html',
})
export class GiftListPage {
  //标题
  title = '添加礼品';
  loadMore: boolean = true;
  showUserImg = false;
  showMenu = true;
  allChecked: any;
  pageId = 1;
  //加载图片
  Fenlei_img = AppConfig.classiFication_img;
  search_img = AppConfig.search_img;
  GouWuCar_img = AppConfig.add_img;

  //接受数据
  merchandisetData = [];
  //接收当前的id
  currentId: String;

  giftLists=[];
  giftL = [];
  // 未找到
  showNOFind: boolean = false;
  //接受当前搜索框输入的文本
  text: String;
  memberId: any;
  customerId: any;
  customer: '';
  isCustomer: any;
  resolve: any;
  giftList=[];
  counts=0;
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
    this.title = '产品中心';
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.memberId = res.data.id; 
        self.ionMerchand(self.memberId, 1, function () {
        });
      }
      console.log(self.memberId)
    })

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

    this.resolve = this.navParams.get("resolve");
    this.giftList = this.navParams.get('gift');
    console.log(this.giftList);
  }

  addGift(item){
    if (item.saleStock <= 0){
      this.httpService.showToast('该商品库存为不足,不能添加');
      return;
    }
    var canPush = true;  
    if (this.giftList && this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        if (this.giftList[i].id == item.id) {
          if (this.giftList[i].counts < item.saleStock) {
            this.giftList[i].counts++;
            this.httpService.showToast("添加成功")
          } else {
            this.httpService.showToast("商品库存不足");
          }
          canPush = false;
        }
      }
    }
    if (canPush){
      item.counts = 1;
      this.giftList.push(item);
      this.httpService.showToast("添加成功");
    } 
    console.log(item,this.giftList); 
  }
  save(){
     this.resolve(this.giftList).then((result) => { });
     this.navCtrl.pop();
  }
  //调用接口的方法
  ionMerchand(employeeId, pageId, calback) {
    let data = {
      "companyId": 36,
      "employeeId": this.memberId,
      "channel": "app",
      "page": pageId,
      "pageSize": 10,
      "sortBy":"product_type,create_time",
      "sortMethod":"asc"
    };
    console.log(data);
    this.httpService.posts(AppConfig.API.merchandisetList, data).subscribe(res => {
      console.log(res.data);
      let code = res.code;
      if (code === 100000) {
        if (res.data.data.length > 0) {
          for (let i in res.data.data) {
            var a = res.data.data[i].productMemberPrice;
            var b = a / 100;
            res.data.data[i].productMemberPrice = b.toFixed(2);
          }
          console.log(a, b, res.data.data)
          this.merchandisetData = this.merchandisetData.concat(res.data.data);
        }
        if (res.data.data.length == 0 && pageId != 1) {
          this.loadMore = false;
          this.httpService.showToast('暂无更多');
        } else {
          this.loadMore = true;
        }
        calback && calback();  
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }
  //搜索


  // 下拉刷新
  doRefresh(refresher) {
    let self = this;
    this.loadMore = false;
    this.pageId = 1;
    this.merchandisetData = [];
    this.ionMerchand(self.memberId, 1, function () {
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
