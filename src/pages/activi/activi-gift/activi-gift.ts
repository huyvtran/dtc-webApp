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
 * Generated class for the ActiviGiftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activi-gift',
  templateUrl: 'activi-gift.html',
})
export class ActiviGiftPage {

  //标题
  title = '添加礼品';
  showUserImg = false;
  showMenu=true;
  //加载图片
  Fenlei_img = AppConfig.classiFication_img;
  search_img = AppConfig.search_img;
  GouWuCar_img = AppConfig.add_img;

  //接受数据
  merchandisetData = [];
  //接收当前的id
  currentId: String;

  // 未找到
  showNOFind: boolean = false;
  //接受当前搜索框输入的文本
  text: String;
  memberId: any;
  customerId: any;
  customer: '';
  isCustomer: any;
  resolve: any;
  giftList = [];
  counts = 0;
  id:any;
  gift=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage, ) {
  }

  ionViewWillLeave() {
    //隐藏
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '产品中心';
    this.showMenu = true;
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.memberId = res.data.id;
        self.ionMerchand();
      }
      console.log(self.memberId)
    })

    
    this.id=this.navParams.get('id');
    console.log(this.id);
    this.resolve = this.navParams.get("resolve");
    this.giftList = this.navParams.get("gift");
    console.log(this.giftList);
  }

  addGift(item,i) {
    if (item.saleStock <= 0) {
      this.httpService.showToast('商品库存不足');
      return;
    }
   
    var canPush = true;
    if (this.giftList && this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        if (this.giftList[i].id == item.id) {
          if (this.giftList[i].counts < item.saleStock) {
            this.giftList[i].counts++;
            this.giftList[i].productNum++;
            this.httpService.showToast("添加成功")
          } else {
            this.httpService.showToast("商品库存不足");
          }
          canPush = false;
          return;
        }
        if (this.giftList[i].productId == item.productId) {
          if (this.giftList[i].counts < item.saleStock) {
            this.giftList[i].counts++;
            this.giftList[i].productNum++;
            this.httpService.showToast("添加成功")
          } else {
            this.httpService.showToast("商品库存不足");
          }
          canPush = false;
          return;
        }
      }
    }
    if (canPush) {
      item.productName = i.productName;
      item.productPrice = i.productPrice / 100;
      item.productMemberPrice = i.productMemberPrice / 100;
      item.productImage = i.productImage;
      item.counts = 1;
      item.productNum = 1;
      this.giftList.push(item);
      this.httpService.showToast("添加成功");
    }
    console.log(item, this.giftList); 
  }
  save() {
    this.resolve(this.giftList).then((result) => { });
    this.navCtrl.pop();
  }


  //调用接口的方法
  ionMerchand() {
    this.httpService.get(AppConfig.API.material + this.id).subscribe(res => {
      console.log(res.data);
      let code = res.code;
      if (code === 100000) {
        this.merchandisetData = res.data;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }
  //搜索
  ionSearch() {
    let data = {
      "keyword": this.text,
      "eventId": this.id,
    };
    this.httpService.posts(AppConfig.API.searchMaterial, data).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code === 100000) {
        this.merchandisetData = res.data;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }
  //搜索

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
