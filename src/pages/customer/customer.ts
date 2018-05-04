import { LoginPage } from './../log_in/login/login';
import { JoinCustomerPage } from './join-customer/join-customer';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage} from "./details/details";
import { TestPage} from "../../pages/test/test";
import { OrderAllPage} from '../orders/order-all/order-all';
import { OrderDetailPage} from '../orders/order-detail/order-detail';
import { LabelManagementPage } from './label-management/label-management';
import { SetupPage } from '../setups/setup/setup';
import { MessagePage } from '../messages/message/message';
import { ShoppingCartPage } from '../orders/shopping-cart/shopping-cart';
import { FilterPage } from './filter/filter';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../app/main';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html'
})
export class CustomerPage {

  breeds = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


  title = '客户管理';

  //加载图片
  search_img = AppConfig.search_img;
  avatar_img = AppConfig.head;
  pet: string = "name";
  isHide=false;
  hide=true;
  show=true;
  showUserImg=true;
  showMenu = true;
  constructor(
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    public events: Events) {
  }

  listCustomer = [];
  listId:any;
  message = {
    headImg:''
  };
  text:any;
  isABC=true;
  //加载图片
  head_pash_img = AppConfig.head_img;
  tixingSet_img = AppConfig.tixing_img;
  shaixuanSet_img = AppConfig.shaiXuan_img;
  biaoqianSet_img = AppConfig.biaoQian_img;
  tianjiaSet_img = AppConfig.tianJia_img;
  page=1;
  pageSize=10;
  customerMoneyList=[];
  loadMore=true;
  ionViewWillLeave (){
    this.show=false;
    this.showMenu = false;
    this.title = '';
  }
  ionViewWillEnter() {
    this.show=true;
    this.showMenu = true;
    this.title = '客户管理';
    this.storage.get('userinfo').then((val) => {
      if (val) {
        console.log(val)
        let name = val.role.name;
        console.log(name)
        if (name != "DTC Head" && name != "DTC Sales") {
          this.isHide = true;
          this.hide = false;
        }
      } else {

      }
    });
   this.getList();
   this.publishEvent();
  }

  publishEvent() {
    this.events.publish('number:shopping', Date.now());
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

  // 获取会员列表
  getList(){  
    let data={}
    this.getMessage(data)
  }


  // 搜索
  search() {
    let data={
      frontParam:this.text
    }
    this.listCustomer=[''];
    this.getMessage(data);
  }

  //获取会员列表
  getMessage(data){
    let self = this;
    this.httpService.getMessage(data, function (res) {
      if (res.code === 100000) {
        self.listCustomer = res.data;
      } else if (res.code === 0){
        self.httpService.modalTo(LoginPage);
      }
    })
  }
  //会员消费列表排序
  getCustomerList(callback?) {
    let self = this;
    var data = {
      page:this.page,
      pageSize:this.pageSize,
      sortMethod:"desc",
      sortBy:"a.total_consume_account"
    }
    this.httpService.posts(AppConfig.API.personMoneyList,data).subscribe(res => {
      if(res.code==100000) {
        if(res.data.data==null || res.data.data.length==0){ 
          if(this.page>1){
            this.loadMore=false;
            this.httpService.showToast('暂无更多');
          }
        }else {
          this.loadMore=true;
          this.customerMoneyList=this.customerMoneyList.concat(res.data.data) ;
        }
      }else{
        this.httpService.showToast(res.msg, '');
      }
      callback && callback(res);
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  //根据姓名或消费金额排序
  getCustomerSort(i){
    if(i==1){
      this.isABC=true;
      let data = {};
      this.getMessage(data)
    }else {
      this.isABC=false;
      this.customerMoneyList=[];
      this.page=1;
      this.getCustomerList()
    }
  }
  //上拉加载
  doInfinite(infiniteScroll){
    console.log('下拉')
    this.page++;
    this.getCustomerList(function(data){
      infiniteScroll.complete();
    });
  }

  goDetails(item){
    this.listId = item.id
    console.log(this.listId);
    //跳转页面  
    this.navCtrl.push(DetailsPage, { "id": this.listId });
  }

 


  test(){
    this.navCtrl.push(TestPage);
  }
  tests() {
    this.httpService.showToast("您无法创建提醒");
  }

  toOrderAll(){
    this.navCtrl.push(OrderAllPage);
  }

  toOrderDetail(){
    this.navCtrl.push(OrderDetailPage)
  }

  cart(){
    this.navCtrl.push(ShoppingCartPage)
  }
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings(){
    this.navCtrl.push(SetupPage)
  }

  createActivity(){
    this.navCtrl.push(LabelManagementPage)
  }

  createActivitys() {
    this.httpService.showToast("您无法管理标签");
  }
  addcustomer(){
    this.navCtrl.push(JoinCustomerPage)
    
  }

  addcustomesrs() {
    this.httpService.showToast("您无法添加客户");
  }

  ionShai(){
    this.navCtrl.push(FilterPage);
  }



    // 检索点击
    indexClick(item){

      for(let index in this.listCustomer){
       if(this.listCustomer[index].key == item && this.listCustomer[index].list.length >0){
         // 找到点击的字母并且检索下存在人员 页面发生偏移
         this.startScroll(index);
       }   
      }
    }

  startScroll(index){
    var offsetY = 0;
    for(let i = 0; i<index; i++){
      if(this.listCustomer[i].list.length > 0){
        offsetY += this.listCustomer[i].list.length * 7 + 3;
      }  
    }  

    // let element = document.getElementById("scrollBox");
    //  element.scrollTo(0, offsetY*12);  // 兼容问题

    document.querySelector('#scrollBox').scrollTop = offsetY*10;
  
  }


}
