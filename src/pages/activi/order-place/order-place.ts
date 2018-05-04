import { ActiviCustomerPage } from './../activi-customer/activi-customer';
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
 * Generated class for the OrderPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-place',
  templateUrl: 'order-place.html',
})
export class OrderPlacePage {
  //标题
  title = '现场下单'
  isHide=false;
  show=true;
  showUserImg = false;
  showMenu=true;
  num:any;
  itemList=[];
  materialIdList=[];
  shoppingList=[];
  id=0;
  //加载图片
  Fenlei_img = AppConfig.classiFication_img;
  search_img = AppConfig.search_img;
  GouWuCar_img = AppConfig.add_img;

  //接受数据
  merchandisetData = [];
  //接收当前的id
  currentId: String;
  counts=0;
  // 未找到
  showNOFind: boolean = false;
  //接受当前搜索框输入的文本
  text: String;
  memberId: any;
  customerId: any;
  customer: '';
  isCustomer: any;
  name:any;
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
  ionViewWillEnter(){
    this.title = '现场下单';
    this.showMenu = true;
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.itemList=[];
    this.materialIdList=[];
    this.shoppingList=[];
    console.log(this.id, this.itemList)
    this.ionMerchand(this.id);
    this.num = 0;
  }


  //调用接口的方法
  ionMerchand(id) {
    this.httpService.get(AppConfig.API.material + id).subscribe(res => {
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
         this.merchandisetData = res.data
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }
  
  addShopping(item,i){
    if (item.saleStock <= 0) {
      this.httpService.showToast("商品库存不足");
      return;
    }
    
    var canPush = true;
    if (this.itemList && this.itemList.length > 0){
      for (let i = 0; i < this.itemList.length; i++) {
        if (this.itemList[i].id == item.id) {
          if (this.itemList[i].counts < item.saleStock) {
            this.itemList[i].counts++;
            this.httpService.showToast("添加成功")
          } else {
            this.httpService.showToast("商品库存不足");
          }
          canPush = false;
        }
      }
    } 
   
    if (canPush){    
      item.productSimplifyName = i.productSimplifyName;
      item.productPrice = i.productPrice / 100;
      item.productMemberPrice = i.productMemberPrice / 100;
      item.productImage = i.productImage;
      item.isLimit = i.isLimit;    
      item.counts = 1;      
      this.itemList.push(item);
      this.httpService.showToast("添加成功");
    }
     console.log(this.itemList)   
       
  }
  shopping(){
    var num=0;
    for(let i=0; i < this.itemList.length;i++){
       var a = this.itemList[i].productMemberPrice;
       var b=this.itemList[i].counts;
       var c= a * b;
       num += c;
       var x=num.toFixed(2);
       this.num = x;
    }
    this.isHide=true;
    this.show=false;
  }
  shoppingHide(){
    this.isHide = false;
    this.show = true;
  }

  clear(){
    this.num=0;
    this.itemList=[];
  }


  add(x) {
    console.log(x);
    var obj = this.itemList[x];
    if (obj.counts >= obj.stock) {
      this.httpService.showToast('数量已达上限');
      return;
    }
    obj.counts++;
    this.shopping();
  }
  reduce(x) {
    var obj = this.itemList[x];
    console.log(obj);
    if (obj.counts > 1) {
      obj.counts--;
    }else{
      this.itemList.splice(x,1);
      this.num = 0;
    }
    this.shopping();
  }

  downList(){
    if (this.itemList.length == 0){
      this.httpService.showToast("请添加商品");
      return;
    }
    console.log(this.itemList);  
    console.log(this.materialIdList, this.shoppingList, this.id);
    this.navCtrl.push(ActiviCustomerPage, { id: this.id, itemList: this.itemList,name:this.name})
  }

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
