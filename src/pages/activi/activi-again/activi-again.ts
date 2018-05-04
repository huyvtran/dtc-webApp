import { ActiviGiftPage } from './../activi-gift/activi-gift';
import { ActiviInvoicePage } from './../activi-invoice/activi-invoice';
import { PaymentVoucherPage } from '../../orders/payment-voucher/payment-voucher';
import { QrCodePage } from '../../orders/qr-code/qr-code';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ActiviAgainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activi-again',
  templateUrl: 'activi-again.html',
})
export class ActiviAgainPage {
  title = '下单';
  isHide = false;
  showUserImg = false;
  showMenu=true;
  need = false;
  good = false;
  ping = false;
  zhifu = false;
  nHide = true;
  nShow = false;
  bid = true;
  bu = true;
  but = false;
  gift = false;
  gb = true;
  gw = false;
  bus=false;
  gShow = false;
  status: any;
  khId: any;
  shenpi = false;
  dtcName: any;
  dtcId: any;
  activiId:any;
  list = [];
  lis = [];
  updates = [];
  newList = [];
  newGift=[];
  all: any;
  alls: any;
  address = {
    name: '',
    tel: '',
    province: '',
    city: '',
    area: '',
    detail: '',
  };
  addres = [];
  invioces = {
    title: '',
    dutyNumber: '',
    accountNumber: '',
    phone: '',
    type: 1,
  };
  inviocess = [];
  shopping = [];
  giftList = [];
  newShopping = [];
  type: any;
  lengths: any;
  total: any;
  totals: any;
  code: any;
  orderId: any;
  companyId: any;

  buyerName: any;
  number: any;
  buyerPhone: any;
  memberNo: any;
  discountAmount = 0;
  userInfo = {
    orderId: '',
    canUseMemberPrice: 1,
    companyId: '',
    openid: '',
    channel: 3,
    isLogisticsOrder: 0,
    preparePay: 10,
    storeId: 99999,
    storeName: '',
    memberId: '',
    productName: '',
    remark: '',
    orderMoney: 0,
    orderType: 1,
    salesName: '',
    salesId: '',
    freight: 0,
    type: 1,
    discount: 0,
    memberPay: 0,
    totalPay: 0,
    productMoney: 0,
    activityId: 0,
    discountAmount: 0,
    productList: [],
    giftProductList: [],
    shoppingCartList: [],
    couponCodeList: [],
    invoiceId: '',
    dtcId: 0,
    dtcName: '',
    salesNo: '',
    salesPhone: '',
    salesInsideNumber: 1, //销售编号
    activityName:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,) {
  }

  ionViewWillLeave() {
    this.showMenu = false;
    this.title = " ";
  }
  ionViewWillEnter() {
    this.title = '下单';
    this.showMenu = true;
    this.storage.get('userinfo').then((val) => {
      if (val) {
        console.log(val);
        let role = val.role.name;
        console.log(name)
      }
    });
    var head = "DTC Head";
    this.getDtc(head);
    this.lengths = 0;
    this.total = 0;
    this.totals = 0;
    let self = this;
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
    this.getDetail(this.navParams.get('id'));

    for (let i = 0; i < this.shopping.length; i++) {
      this.lengths += this.shopping[i].productNum;
    }
  }

  // 获取订单详情
  getDetail(id) {
    this.httpService.get(AppConfig.API.orderDetail + id).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code == 100000) {
        this.buyerName = res.data.buyerName;
        this.number = res.data.orderNum;
        this.buyerPhone = res.data.buyerPhone;
        this.memberNo = res.data.memberNo;
        this.userInfo.memberId = res.data.memberId;
        this.khId = res.data.memberId;
        this.shopping = res.data.normalProductDetails;
        this.activiId = res.data.activityId;
        this.userInfo.activityId = res.data.activityId;
        this.userInfo.activityName = res.data.activityName;
        console.log(this.shopping, this.userInfo.activityName);
        if (res.data.presentProductDetails.length > 0 && this.giftList.length == 0) {
          this.giftList = res.data.presentProductDetails;
          this.alls = true;
          this.gift = true;
        }
        if (res.data.orderInvoice) {
          this.invioces = res.data.orderInvoice;
          this.userInfo.invoiceId = res.data.orderInvoice.memberInvoiceId;
        }
        this.userInfo.remark = res.data.remark;
        this.userInfo.orderId = res.data.id;
        this.userInfo.discountAmount = res.data.discountAmount / 100;
        this.discountAmount = res.data.discountAmount / 100;
        this.dtcName = res.data.dtcName;
        this.userInfo.dtcId = res.data.dtcId;
        this.userInfo.dtcName = this.dtcName;
        if (this.addres.length != 0) {
          this.address = this.addres[0];
          this.address.name = this.addres[0].name;
          this.address.tel = this.addres[0].phone;
          this.address.city = this.addres[0].cityName;
          this.address.province = this.addres[0].provinceName;
          this.address.area = this.addres[0].districtName;
          this.address.detail = this.addres[0].address;
        }
        if (this.inviocess.length != 0) {
          this.invioces.title = this.inviocess[0].companyName;
          this.invioces.dutyNumber = this.inviocess[0].taxNumber;
          this.invioces.accountNumber = this.inviocess[0].bankAccount;
          this.invioces.phone = this.inviocess[0].phone;
          this.invioces.type = this.inviocess[0].type;
          this.userInfo.invoiceId = this.inviocess[0].id;
        }

        if (this.userInfo.discountAmount > 0) {
          this.shenpi = true;
        }
        this.youhui();

        if (res.data.preparePay == 5) {
          this.type = '微信支付';
        }
        if (res.data.preparePay == 6) {
          this.type = '支付宝支付';
        }
        if (res.data.preparePay == 4) {
          this.type = '微信支付';
        }
        if (res.data.preparePay == 3) {
          this.type = '银行转账';
        }
        if (res.data.preparePay == 2) {
          this.type = 'POS机支付';
        }
        if (res.data.preparePay == 1) {
          this.type = '现金支付';
        }

        this.userInfo.preparePay = res.data.preparePay;

      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  yes() {
    console.log(this.all)
    if (this.all == true) {
      this.need = true;
    } else {
      this.need = false;
    }
  }

  youhui() {
    this.userInfo.productList = [];
    var len = 0;
    var tol = 0;
    for (let i = 0; i < this.shopping.length; i++) {
      let a = this.shopping[i].productNum;
      let b = this.shopping[i].productMemberPrice / 100;
      let e = this.shopping[i].productId;
      tol += parseInt(a) * b;
      len += parseInt(a);
      this.total = tol.toFixed(2);
      this.totals = tol * 100;
      this.lengths = len;
      let c = { productId: e, num: a };
      this.userInfo.productList.push(c);
      var su = this.totals.toFixed(2);
      var sd = parseInt(su)
      this.userInfo.totalPay = sd;
      this.userInfo.productMoney = sd;
      this.userInfo.orderMoney = sd;
      console.log(this.userInfo.productList)
    }
  }

  update() {
    this.nHide = true;
    this.nShow = false;  
    this.concessional(); 
    this.youhui();
  }


  concessional() {
    if (this.discountAmount > 0) {
      this.shenpi = true;
    }
    if (this.discountAmount <= 0) {
      this.shenpi = false;
    }
    console.log(this.discountAmount);
    var a = this.discountAmount * 100;
    this.userInfo.discountAmount = a / 100;
    console.log(this.userInfo.discountAmount);

    if (this.userInfo.discountAmount > 0) {
      this.updateDiscount();
    }
  }

  //提交优惠价
  updateDiscount() {
    this.newShopping = [];
    console.log(this.shopping);
    for (let i = 0; i < this.shopping.length; i++) {
      var a = {
        productId: this.shopping[i].productId,
        num: this.shopping[i].productNum,
      }
      this.newShopping.push(a);
    }
    let data = {
      productList: this.newShopping,
      discountAmount: this.userInfo.discountAmount * 100,
      activityId: this.userInfo.activityId
    }
    console.log(data)
    this.httpService.posts(AppConfig.API.activity2, data).subscribe(res => {
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

  delete(id) {
    console.log(id, this.shopping);
    for (let i = 0; i < this.shopping.length; i++) {
      if (this.shopping[i].productId == id) {
        this.shopping.splice(this.shopping[i], 1)
      }
    }
    if (this.shopping.length == 0) {
      this.lengths = 0;
      this.total = 0;
      this.discountAmount = 0;
    }
  }

  add(id) {
    console.log(id, this.shopping)
    if (this.shopping.length > 0) {
      for (let i = 0; i < this.shopping.length; i++) {
        if (this.shopping[i].id == id) {
          if (this.shopping[i].isLimit == 1 && this.shopping[i].productNum >= this.shopping[i].limitCounts) {
            this.httpService.showToast('商品库存不足');
            return;
          }
          this.shopping[i].productNum++;
        }
      }
    }
  }
  reduce(id) {
    console.log(id, this.shopping)
    if (this.shopping.length > 0) {
      for (let i = 0; i < this.shopping.length; i++) {
        if (this.shopping[i].id == id) {
          if (this.shopping[i].productNum == 1) {
            this.httpService.showToast('数量已达下限');
            return;
          }
          this.shopping[i].productNum--;
        }
      }
    }
  }

  bianji() {
    this.nHide = false;
    this.nShow = true;
    this.discountAmount = 0;
    for (let i = 0; i < this.shopping.length; i++) {
      this.shopping[i].discountAmount = this.shopping[i].stringMoney
    }
  }

  payment(type) {
    if (type == '微信支付') {
      this.userInfo.preparePay = 5;
      this.type = '微信支付';
    }
    if (type == '支付宝支付') {
      this.userInfo.preparePay = 6;
      this.type = '支付宝支付';
    }
    if (type == '现金支付') {
      this.userInfo.preparePay = 1;
      this.type = '现金支付';
    }
    if (type == 'POS机支付') {
      this.userInfo.preparePay = 2;
      this.type = 'POS机支付';
    }
    if (type == '银行转账') {
      this.userInfo.preparePay = 3;
      this.type = '银行转账';
    }
  }

  return() {
    this.isHide = false;
    this.bid = false;
    this.good = true;
  }

  toQrCode() {
    this.isHide = true;
  }

  //提交订单
  button() {

    if (this.userInfo.discountAmount < 0) {
      this.httpService.showToast('优惠价不能为负数');
      return;
    }
    if (this.userInfo.preparePay == 10) {
      this.httpService.showToast('请选择付款方式');
      return;
    }
    
    this.confirmGoods();
  }
  // 确认下单
  confirmGoods() {
    let self = this;
    this.httpService.customAlert('提示', '确认提交?', function () {
      self.newButton();
    }, function () {
    })
  }
  newButton() {
    this.getExamine();
  }

  tijiao() {
    this.userInfo.giftProductList=[];
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        let a = this.giftList[i].productNum;
        let e = this.giftList[i].productId;
        let c = { productId: e, num: a };
        this.userInfo.giftProductList.push(c);
      }
    }

    console.log(this.discountAmount);
    this.userInfo.discountAmount = this.discountAmount * 100;
    this.bus=true;
    this.bu=false;
    console.log(this.userInfo);
    this.httpService.posts(AppConfig.API.newOnline, this.userInfo).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.storage.remove('customerId');
        if (res.data) {
          // this.address=res.data;
          this.code = res.data;
          this.but = true;
          this.bu = false;
          this.bus=false;
          this.getStatus(this.code);

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
        console.log(this.address);
      } else {
        this.httpService.showToast(res.msg, '');
        this.bu = true;
        this.bus = false;
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  getStatus(orderNum) {
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


  //返回
  returns() {
    this.navCtrl.pop();
  }


  getInv() {
    this.navCtrl.push(ActiviInvoicePage, { id: this.khId, resolveAdd: this.callbackInv })
  }
  callbackInv = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.inviocess = data;
      resolve();
    });
  }

  change() {
    for (let i = 0; i < this.lis.length; i++) {
      if (this.dtcName == this.lis[i].name) {
        this.dtcId = this.lis[i].id;
      }
    }
    this.userInfo.dtcName = this.dtcName;
    this.userInfo.dtcId = this.dtcId;
    console.log(this.dtcName, this.dtcId)
  }

  //是否需要审批
  getExamine() {
    this.newGift=[];
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        let a = this.giftList[i].productNum;
        let e = this.giftList[i].productId;
        let x = this.giftList[i].materialId;
        let c = { productId: e, num: a };
        let y = { materialId: x, num: a };
        this.newGift.push(c);
      }
    }
    console.log(this.userInfo.dtcName)
    let data = {
      'productList': this.userInfo.productList,//商品数组
      'discountAmount': this.userInfo.discountAmount, //优惠价
       'giftList': this.newGift,
      'activityId': this.userInfo.activityId
    }
    console.log(data);
    this.httpService.posts(AppConfig.API.examine, data).subscribe(res => {
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
            console.log(this.userInfo.dtcName)
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
  getDtc(role) {
    console.log(role);
    this.httpService.get(AppConfig.API.role + role).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.lis = res.data;

      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  gbs() {
    this.gb = false;
    this.gw = true;
    this.gShow = true;
  }
  gws() {
    this.gw = false;
    this.gb = true;
    this.gShow = false;
  }
  adds(id) {
    console.log(id, this.giftList)
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        if (this.giftList[i].productId == id) {
          if (this.giftList[i].isLimit == 1 && this.giftList[i].productNum >= this.giftList[i].limitCounts) {
            this.httpService.showToast('商品库存不足');
            return;
          }
          this.giftList[i].productNum++;
        }
      }
    }
  }
  // 礼品减
  reduces(id) {
    console.log(id, this.giftList)
    if (this.giftList.length > 0) {
      for (let i = 0; i < this.giftList.length; i++) {
        if (this.giftList[i].productId == id) {
          if (this.giftList[i].productNum == 1) {
            this.giftList.splice(i, 1);
            return;
          }
          this.giftList[i].productNum--;
        }
      }
    }
  }

  callback = (data) => {
    this.giftList = [];
    return new Promise((resolve, reject) => {
      console.log(data);
      if (data.length > 0) {
        this.giftList = data;
      }
      resolve();
    });
  }


  addLift() {
    if (this.alls == true) {
      this.gift = true;
    } else {
      this.gift = false;
    }
  }

  //礼品
  togift() {
    this.navCtrl.push(ActiviGiftPage, { resolve: this.callback, id: this.activiId, gift: this.giftList})
  }

  //支付
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
  toCodes() {
    this.navCtrl.push(QrCodePage, {
      'id': this.userInfo.memberId,
      'money': this.userInfo.orderMoney,
      'pay': this.userInfo.preparePay,
      'code': this.code
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

  // 取消订单
  cancelOrder() {
    this.cancelOrd();
  }
  //取消订单userInfo.
  cancelOrd() {
    let data = {
      orderId: this.userInfo.orderId
    }
    this.httpService.post(AppConfig.API.cancel, data).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code == 100000) {
        this.httpService.showToast("取消成功", '');
        this.navCtrl.pop();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


}
