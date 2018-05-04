import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main'
import { Storage } from '@ionic/storage';
import { ProductPage } from '../../products/product/product';
import { MaterialdetailsPage } from '../materialdetails/materialdetails';

/**
 * Generated class for the AddproductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproducts',
  templateUrl: 'addproducts.html',
})
export class AddproductsPage {
  title = "添加产品";
  showUserImg = false;
  showMenu=true;
  //标题

  //加载图片
  Fenlei_img = AppConfig.classiFication_img;
  search_img = AppConfig.search_img;
  GouWuCar_img = AppConfig.add_img;

  merchandisetData = [];
  showNOFind: boolean = false;
  text: String;
  memberId: any;
  customerId: any;
  customer: '';
  isCustomer: any;
  list = [];
  resolve: any;
  type;   // 活动类型
  wareHouse;   // 仓库
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
    this.title = '添加产品';
    this.showMenu = true;
    this.resolve = this.navParams.get("resolve");
    this.list = this.navParams.get("list");
    this.type = this.navParams.get("type");
    this.wareHouse = this.navParams.get("wareHouse");

    if(this.wareHouse){
      this.getMaterial(this.wareHouse);
    }else{
      this.showToast("获取仓库失败");
    }
  }

  getMaterial(house) {

    let data = {
      "companyId": 36,
    };

  //  var url = AppConfig.API.merchandisetList;
    var url = "product/activity/warehouse/"+ house;

    this.httpService.get(url).subscribe(res => {
      console.log(res.data);
      let code = res.code;
      if (code === 100000) {
        for (let i in res.data) {
          if(res.data[i]){
            var a = res.data[i].productMemberPrice;
            var b = a / 100;
            res.data[i].productMemberPrice = b.toFixed(2);
          }
        }

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
    let data = { "searchKey": this.text };
    this.httpService.post(AppConfig.API.merchandisetList, data).subscribe(res => {
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
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
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

  // 添加物料
  addMaterial(item) {
    console.log(item);

    var canPush = true;
 
    // 如果已存在则数量累加
    if (this.list && this.list.length >0) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].productId == item.id) {
          if(this.list[i].productNum < item.activitySaleStock){
            this.list[i].productNum++;
            this.showToast("添加成功")
          }else{
            this.showToast("已达最大数量");
          }
      
          canPush = false;
        } 
      }
    }
 
    // 如果不存在则累加 
    if (canPush) {
      this.list.push({
        id: "",
        eventType: this.type,
        productId: item.id,
        productNum: 1,
        max: item.activitySaleStock,
        productName: item.productSimplifyName,
        edit: false
      });
      this.showToast("添加成功");
    }
    console.log(this.list);

  }

  save(){
    this.resolve(this.list).then((result) => { });
    this.navCtrl.pop();
  }

  showToast(msg) {
    this.httpService.showToast(msg);
  }

  // 查看详情
  toProductDetail(id){
     this.navCtrl.push(MaterialdetailsPage,{id:id});
  }

}
