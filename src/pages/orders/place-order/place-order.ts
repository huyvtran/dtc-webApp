import { ChooseInvoicePage } from './../choose-invoice/choose-invoice';
import { ChooseAddressPage } from './../choose-address/choose-address';
import { InvoiceStatePage } from './../../customer/invoice-state/invoice-state';
import { NewaddPage } from './../../customer/newadd/newadd';
import { OrderAddressPage } from './../order-address/order-address';
import { OnlineCustomerPage } from './../online-customer/online-customer';
import { PaymentVoucherPage } from '../payment-voucher/payment-voucher';
import { QrCodePage } from '../qr-code/qr-code'
import { ReceiptPage } from '../receipt/receipt'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GiftListPage } from '../gift-list/gift-list';
import { OrderDetailPage } from '../order-detail/order-detail';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/**
 * Generated class for the PlaceOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
// @IonicPage()
@Component({
  selector: 'page-place-order',
  templateUrl: 'place-order.html',
})
export class PlaceOrderPage {
  title = '下单详情';
  isHide = false;
  showUserImg = false;
  showMenu = true;
  need=false;
  good=false;
  ping=false;
  zhifu=false;
  nHide=true;
  nShow=false;
  nShows = false;
  bid=true;
  bu=true;
  but=false;
  shenpi=true;
  gift=false;
  gb=true;
  gw=false;
  gShow=false;
  status:any;
  stat=true;
  bus=false;
  role:'';
  list=[];
  lis=[];
  dtcList=[];
  updates=[];
  newList=[];
  all:any;
  alls: any;
  address=[];
  addres=[];
  invioces=[];
  inviocess = [];
  shopping=[];
  giftList=[];
  newShopping=[];
  newGift=[];
  dtcName:any;
  dtcId:any;
  type:any;
  lengths:any;
  total:any;
  totals:any;
  code:any;
  buyerName:any;
  buyerPhone:any;
  memberNo:any;
  orderId:any;
  companyId:any;
  discountAmount:any;
  userInfo={
    canUseMemberPrice:1,
    companyId:'',
    openid:'',
    channel:3,
    isLogisticsOrder:1,
    preparePay:10,
    storeId:99999,
    storeName:'',
    memberId:'',
    productName:'',
    remark:'',
    orderMoney:0,
    orderType:1,
    salesName:'',
    salesId: '',
    freight:0,
    type:1,
    discount:0,
    memberPay:0,
    totalPay:0,
    productMoney:0,
    activityId:0,
    discountAmount:0,
    productList:[],
    giftProductList:[],
    shoppingCartList:[],
    couponCodeList:[],
    addressId:'',
    invoiceId:'',
    dtcId:0,
    dtcName:'',
    salesNo:'',
    salesPhone:'',
    salesInsideNumber:1, //销售编号
    activityName:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
    public events: Events) {
  }

  ionViewWillLeave() {
    this.showMenu=false;
    this.title = " ";
  }
  ionViewWillEnter (){
    var head = "DTC Head";
    this.getDtc(head);
    this.shopping=[]; 
    this.newGift = [];
    var lists = this.navParams.get('list');
    console.log(lists);
    this.choose(lists);
    console.log(this.list)
    this.userInfo.orderType = this.navParams.get('orderType')  
    console.log(this.userInfo.orderType);
    this.lengths=0;
    this.total=0;
    this.totals = 0;
    let self=this;
    this.httpService.getContent(function (res) {
      console.log(res)
      if (res.code === 100000) {
        self.companyId = res.data.companyId;
        self.userInfo.salesName = res.data.name;
        self.userInfo.salesId = res.data.id;
        self.userInfo.salesNo = res.data.employeeNo;
        self.userInfo.salesPhone = res.data.mobile;
      }
      self.userInfo.companyId = self.companyId;   
      console.log(self.companyId)
    })  

    this.storage.get('activityMessage').then((val) => {
      if(val){
       console.log(val);
       this.userInfo.activityId = val.id;
       this.userInfo.activityName = val.name;
      }else{
        this.storage.remove('activityMessage');
      }       
   });
  }

  yes(){
      console.log(this.all)
    if (this.all==true){
       this.need=true;
    }else{
      this.need = false;
    }   
  }

  getMessage(){ 
    this.userInfo.shoppingCartList=[];
    this.shopping=[];
    this.userInfo.productList=[];
    console.log(this.list);
      if(this.list.length > 0){
        console.log(this.list);
        this.buyerName=this.list[0].username;
        this.userInfo.memberId= this.list[0].id;
        this.buyerPhone = this.list[0].tel;
        this.memberNo = this.list[0].memberNumber;
      }  
      this.showMenu=true;
      this.title = '下单';
      this.getDefault();
      this.getInvioce(); 
      this.shopping = this.navParams.get('orders');
      for (let i = 0; i < this.shopping.length;i++){
         var x=this.shopping[i].id;
         this.userInfo.shoppingCartList.push(x)
      }

      console.log(this.shopping)
      this.youhui();
      console.log(this.shopping, this.userInfo.productList)
  }


  //查找客户
  choose(lists) {
    console.log(lists[0])
    let data={}
    this.httpService.posts(AppConfig.API.chooseCustomers, data).subscribe(res => {
      console.log(res.data);
      var listCustomer = res.data;
      for (let i = 0; i < listCustomer.length;i++){
        if (listCustomer[i].list.length > 0) {
          for (let j = 0; j < listCustomer[i].list.length; j++) {
            if (lists[0] == listCustomer[i].list[j].id) {
              this.list.push(listCustomer[i].list[j])
            }
          }
        }         
      }
      console.log(this.list);
      this.getMessage();  
    })
  }


  // 商品价格处理
  youhui(){
    this.userInfo.productList=[];
    var len = 0;
    var tol = 0;
    console.log(this.shopping);
    for (let i = 0; i < this.shopping.length; i++) {
      let a = this.shopping[i].counts;
      let b = this.shopping[i].stringMoney;
      let e = this.shopping[i].productId;
      let f = this.shopping[i].id;

      console.log(a);
      tol += a * b;
      len += parseInt(a);
      this.total = tol.toFixed(2);
      this.totals =tol * 100;
      this.lengths = len;
      console.log(len,this.lengths);
      let c = { productId: e, num: a };
      let d = { productId: e, num: a, shoppingCartId:f };
      this.userInfo.productList.push(c);
      var su = this.totals.toFixed(2);
      var sd = parseInt(su)
      this.userInfo.totalPay = sd;
      this.userInfo.productMoney = sd;
      this.userInfo.orderMoney = sd;
      console.log(this.userInfo.productList)
    } 
  }

  // 商品更新
  update() {  
    this.nHide = true;
    this.nShow = false;  
    this.updates=[];
    console.log(this.shopping);
    var e;
    for (let i = 0; i < this.shopping.length; i++) {
        var a = {
          id: this.shopping[i].id,
          counts: this.shopping[i].counts,
          channel: 3
        }
      this.updates.push(a);
    }
    this.httpService.posts(AppConfig.API.updateShopping, this.updates).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {          
        this.concessional();  
        this.youhui();  
      
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  //提交优惠价
  updateDiscount(){
    console.log(this.lengths);
    this.lengths=0;
    this.newShopping=[];
    console.log(this.shopping);
    for (let i = 0; i < this.shopping.length; i++) {
      var a = {
        productId: this.shopping[i].productId,
        num: this.shopping[i].counts,
        shoppingCartId: this.shopping[i].id,
      }
      this.newShopping.push(a);
    }
    this.userInfo.discountAmount = this.discountAmount;
    let data={
      productList: this.newShopping,
      discountAmount: this.userInfo.discountAmount * 100,
    }
    console.log(data)
    this.httpService.post(AppConfig.API.updateDiscount, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.userInfo.discountAmount = res.data.discountAmount / 100;
        this.shopping = res.data.list;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  // 优惠价
  concessional(){
    var applyDiscount=0;
    console.log(this.shopping,this.discountAmount);
    for(let i=0;i<this.shopping.length;i++){
      var can= this.shopping[i].canApplyDiscount
      if(can != 1){
        applyDiscount += this.shopping[i].stringMoney;
        if (this.discountAmount > 0 && this.discountAmount < applyDiscount) {
          this.httpService.showToast("优惠价不可低于" + applyDiscount);
          return;
        }
      }

      console.log(applyDiscount);          
    } 
    if (this.discountAmount == 0) {
      this.userInfo.discountAmount = this.discountAmount;
      return;
    }  
  
    if (this.discountAmount > 0){
       this.updateDiscount();
    }
   
  }


// 商品加
  add(id) {
    console.log(id,this.shopping)
    if (this.shopping.length > 0) {
      for (let i = 0; i < this.shopping.length; i++) {
          if (this.shopping[i].id == id) {
            if (this.shopping[i].isLimit == 1 && this.shopping[i].counts >= this.shopping[i].maxStock) {
                this.httpService.showToast('商品库存不足');
                return;
              }         
            this.shopping[i].counts++;
          }
      }
    } 
  }
  // 商品减
  reduce(id) {
    console.log(id,this.shopping);
    
    if (this.shopping.length > 0) {
      for (let i = 0; i < this.shopping.length; i++) {
          if (this.shopping[i].id == id) {
            if (this.shopping[i].counts == 1) {
              this.httpService.showToast('数量已达下限');
              return;
            }
            this.shopping[i].counts--;
          }
      }
    }
  }

  // 编辑按钮
  bianji(){
    this.discountAmount = 0;
    for(let i=0;i<this.shopping.length;i++){
      this.shopping[i].discountAmount = this.shopping[i].stringMoney
    }
    this.nHide=false;
    this.nShow=true;
  }

  gbs(){
    this.gb=false;
    this.gw=true;  
    this.gShow=true;
  }
  gws(){
    this.gw = false;
    this.gb = true;
    this.gShow=false;
  }



  adds(id) {
    console.log(id, this.giftList)
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        if (this.giftList[i].id == id) {
          if (this.giftList[i].isLimit == 1 &&  this.giftList[i].counts >= this.giftList[i].saleStock){
            this.httpService.showToast('商品库存不足');
            return;
          }
          this.giftList[i].counts++;
        }
      }
    }
  }
  // 礼品减
  reduces(id) {
    console.log(id, this.giftList)
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        if (this.giftList[i].id == id) {
          if (this.giftList[i].counts == 1) {         
            this.giftList.splice(i,1);
            return;
          }
          this.giftList[i].counts--;
        }
      }
    }
  }

// 审批
  getOnline(){
    let online={};
    this.httpService.posts(AppConfig.API.loginUrl,online).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code == 100000) {
            this.shenpi=true;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });   
  }


//礼品
  togift(){
    this.navCtrl.push(GiftListPage, { resolve: this.callback, gift: this.giftList})
  }
// 支付方式
  payment(type) {
    if (type =='微信支付'){
      this.userInfo.preparePay=5;
      this.type = '微信支付';
    }
    if (type == '支付宝支付') {
      this.userInfo.preparePay =6;
      this.type = '支付宝支付';
    }
    if (type == '现金支付') {
      this.userInfo.preparePay =1;
      this.type = '现金支付';
    }
    if (type == 'POS机支付') {
      this.userInfo.preparePay =2;
      this.type = 'POS机支付';
    }
    if (type == '银行转账') {
      this.userInfo.preparePay =3;
      this.type = '银行转账';
    }
  }

  return(){
    this.isHide = false;
    this.bid=false;
    this.good=true;
  }

  toQrCode(){
    this.isHide = true;
  }

  //提交订单
  button(){ 
    if (this.userInfo.discountAmount < 0) {
      this.httpService.showToast('优惠价不能为负数');
      return;
    }
    console.log(this.giftList, this.userInfo.productList, this.userInfo.shoppingCartList)
    if (!this.buyerName) {
      this.httpService.showToast('请选择客户');
      return;
    }

    if (this.all == true && this.invioces.length == 0) {
      this.httpService.showToast('请添加发票信息');
      return;
    }
    if (this.userInfo.preparePay == 10) {
      this.httpService.showToast('请选择付款方式');
      return;
    }
    this.confirmGoods();  
  }

newButton(){
  this.getExamine();    
}

  // 确认下单
  confirmGoods() {
    let self = this;
    this.httpService.customAlert('提示', '确认提交?', function () {
      self.newButton();
    }, function () {
    })
  }

  publishEvents() {
    this.events.publish('number:shopping', Date.now());
  }

tijiao(){
    this.userInfo.giftProductList=[];
    if (this.shopping.length == 0) {
      this.httpService.showToast('请选择商品');
      return;
    }
    console.log(this.stat);
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        let a = this.giftList[i].counts;
        let e = this.giftList[i].id;
        let c = { productId: e, num: a };
        this.userInfo.giftProductList.push(c);
      }
    }

    this.userInfo.discountAmount = this.discountAmount * 100;
    this.bu = false;
    this.bus = true;  
    console.log(this.userInfo.discountAmount)
    this.httpService.post(AppConfig.API.online, this.userInfo).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.storage.remove('activityMessage');
        this.storage.remove('customerId');
        if (res.data) {
          this.address.push(res.data);
          this.code = res.data;
          this.but = true;
          this.bu = false; 
          this.bus = false;
          this.getStatus(this.code);
          this.publishEvents();
          if (this.userInfo.dtcName) {
            this.httpService.showToast('订单提交成功,并且订单进入待审批(DTC Head)状态');
            this.returns();
            return;
          }
          if (!this.userInfo.dtcName) {
            this.httpService.showToast('订单提交成功,并且订单进入待支付状态');
            this.returns();
            return;
          }
        }
      } else {
        this.httpService.showToast(res.msg, '');
        this.bus = false;
        this.bu = true; 
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  //获取订单状态
  getStatus(orderNum){
    this.httpService.get(AppConfig.API.getStatus + orderNum).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        if (res.data) {
          this.orderId = res.data.orderId
          if (res.data.status == 1) {
            this.status = 1;
            if (this.userInfo.preparePay == 5 || this.userInfo.preparePay == 6) {
              this.zhifu = true;
              this.ping = false;
            }
            if (this.userInfo.preparePay == 1 || this.userInfo.preparePay == 2 || this.userInfo.preparePay == 3) {
              this.ping = true;
              this.zhifu = false;
            }    
          } else {
            this.status = 2;
          }
        }       
        console.log(this.address);
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  callback = (data) => {
    this.giftList = [];
    return new Promise((resolve, reject) => {
      console.log(data, this.giftList);
      this.giftList = [];
      if(data.length > 0){
         this.giftList=data;
      }   
      resolve();
    });
  }

  addLift(){
    if (this.alls == true) {
      this.gift = true;
    } else {
      this.gift = false;
    }   
  }

  getAddress() {
    if (this.list.length > 0) {
      this.navCtrl.push(ChooseAddressPage, { id: this.list[0].id, resolveAdd: this.callbackAdd })
    }
  }
  callbackAdd = (data) => {
    return new Promise((resolve, reject) => {  
      console.log(data);
      this.address=[];
      this.addres=data;
      resolve();
    });
  }
  getInv() {
    if (this.list.length > 0) {
      this.navCtrl.push(ChooseInvoicePage, { id: this.list[0].id, resolveAdd: this.callbackInv })
    }
  }
  callbackInv = (data) => {
    return new Promise((resolve, reject) => { 
        console.log(data);
        this.invioces=[];
        this.inviocess = data;
        resolve(); 
    });
  }

//获取默认地址
  getDefault(){
    this.address=[];
    if (this.list.length > 0) {
      let id = this.list[0].id;  
      console.log(id)
      this.httpService.get(AppConfig.API.getDefault+id).subscribe(res => {
        console.log(res)
        let code = res.code
        if (code === 100000) {
          if (res.data) {
            this.address.push(res.data);
            this.userInfo.addressId = res.data.id; 
          }
          if(this.addres.length!=0){
            this.address=this.addres;
            this.userInfo.addressId = this.addres[0].id
          }

          console.log(this.address);   
        } else {
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('请检查参数或路径是否正确');
      });
    }    
  }

  //获取默认发票
  getInvioce(){
    this.invioces = [];
    if (this.list.length > 0) {
      let id = this.list[0].id;
      console.log(id)
      this.httpService.get(AppConfig.API.getInovice + id).subscribe(res => {
        console.log(res)
        let code = res.code
        if (code === 100000) {
          if (res.data) {
              this.invioces.push(res.data);
              this.userInfo.invoiceId = res.data.id;    
            }                
        
          if (this.inviocess.length != 0){
             this.invioces = this.inviocess;
             this.userInfo.invoiceId = this.inviocess[0].id;
          }
         
          console.log(this.invioces, this.inviocess);
        } else {
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('请检查参数或路径是否正确');
      });
    }    
  }

  //返回订单
  returns(){
    this.navCtrl.parent.select(1); 
    this.navCtrl.popToRoot();
  }

  //上传支付凭证
  toPaymentVoucher() {
      this.navCtrl.push(PaymentVoucherPage, {
        'id': this.orderId,
        'money': this.userInfo.orderMoney,
        'code': this.code
      });
    // }else{
    //   this.navCtrl.parent.select(2);
    //   // this.navCtrl.pop();
    //   // this.navCtrl.pop();
    // }   
  }

  //付款吗
  toCodes() {
    this.navCtrl.push(QrCodePage,{
      'id': this.userInfo.memberId,
      'money': this.userInfo.orderMoney,
      'pay': this.userInfo.preparePay,
      'code':this.code
    });
  }
 
  //是否需要审批
  getExamine(){ 
    this.newGift=[];
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        let a = this.giftList[i].counts;
        let e = this.giftList[i].id;
        let c = { productId: e, num: a };
        this.newGift.push(c);
      }
    }
    let data={
      'productList': this.userInfo.productList,//商品数组
      'discountAmount': this.userInfo.discountAmount, //优惠价
      'giftList': this.newGift
    }
    console.log(data);
    this.httpService.posts(AppConfig.API.examine,data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        if (res.data == true) {
          if (!this.userInfo.dtcName) {
            this.httpService.showToast('该订单需要审批后才能下单,请选择审批人后提交订单');
            return;
          }
        } if (res.data == false) {
          if (this.userInfo.dtcName) {
            // this.httpService.showToast('该订单无需审批,已进入待支付状态,请联系客户尽快支付该订单');
            this.userInfo.dtcName = '';
            this.tijiao();
            return;
          }
        }
        if (res.data == true) {
          if (this.userInfo.dtcName) {
            this.tijiao();
          }
        }
        if (res.data == false) {
          if (!this.userInfo.dtcName) {
            this.tijiao();
          }
        }
           
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
    
   
  }

  //获取dtc
  getDtc(role){
    console.log(role);
    this.httpService.get(AppConfig.API.role + role).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
          this.lis=res.data;       
       
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  change() {
    for (let i = 0; i < this.lis.length; i++) {
      if (this.dtcName == this.lis[i].name) {
        this.dtcId = this.lis[i].id;
      } 
    }
    this.userInfo.dtcName=this.dtcName;
    this.userInfo.dtcId=this.dtcId;
    console.log(this.dtcName, this.dtcId)
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
