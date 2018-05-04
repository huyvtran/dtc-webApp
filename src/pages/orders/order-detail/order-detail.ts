import { LogisticsOrderPage } from './../logistics-order/logistics-order';
import { ReturnOrderPage } from './../return-order/return-order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentVoucherPage } from '../payment-voucher/payment-voucher';
import { ReceiptPage } from '../receipt/receipt'
import { QrCodePage } from '../qr-code/qr-code'
import { LogisticsPage } from '../logistics/logistics'
import { GiftListPage } from '../gift-list/gift-list'
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  title = "订单详情";
  showUserImg = false;
  showMenu = true;
  hw = true;
  hn = false;
  goods = false;
  notes=false;
  num: any;
  rolId:any;
  rolMdId:0;
  rolHeadId:0;
  orderId = [];
  orderLogisticsRefundId:any;
  orderInfo = {
    memberId: "",  // 会员id
    orderMoney: "",  // 价格
    preparePay: "",   // 支付方式
    orderNum: "",   // 订单号
    remark: "",
    status: "",
    channel: "",
    discountAmount:"",
    isLogisticsOrder:""
  };
  orderAddress = {}; // 收货地址
  orderInvoice = {}; // 发票
  productList = [];  // 产品列表
  urlList = [];
  giftList = [];     // 礼品列表
  logistics = [];  //物流信息
  status: any;
  roleName: string   // 角色
  approvalFlag: any; //是否需要md审批标识
  approvalInfo = {} //确认审批参数
  mdId: 0
  mdName: ''
  MDlist = []//md人员列表
  chooseRadioMD = ''//选中的md
  isRejectShow = false;//驳回显示
  isRefundShow = false;//退款回显
  overruleReason = ''//驳回理由
  overruleReasoninfo=''//退款理由
  isReject = true
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider, private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.title = '订单详情';
  }

  ionViewDidLoad() {
    this.orderId = this.navParams.get("id");
    console.log(this.orderId) 
    this.mdApproval(this.orderId)
    this.getDetail(this.orderId); 
    this.getMdList()
  }

  getUserInfo() {
    this.storage.get('userinfo').then((val) => {
      if (val) {
        console.log(val);
        this.roleName = val.role.name;
        console.log(val.role.name)
        if (val.role.name == 'Manager Director') {
          this.approvalFlag = false
        }
        console.log(this.approvalFlag)
      }
    });
     let self = this;
     this.httpService.getContent(function (res) {
      console.log(res) 
      if (res.code === 100000) {
        self.rolId = res.data.id;
        console.log(self.rolId)
      }
    })
  }
  // 获取订单详情
  getDetail(id) {
    this.httpService.get(AppConfig.API.orderDetails +id).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code == 100000) {
        this.orderInfo = res.data;
        if (this.orderInfo.channel == '3') {
          if (this.orderInfo.status == '7' || this.orderInfo.status == '10' || this.orderInfo.status == '11' || this.orderInfo.status == '13' || this.orderInfo.status == '8' || this.orderInfo.status == '5' || this.orderInfo.status == '14') {
            this.hw = false;
            this.hn = true;
          }
        }
        if (res.data.remark && res.data.remark != null) {
          this.notes = true;
        }
        if (res.data.address != null) {
          this.goods = true;
          this.orderAddress = res.data.address;
        }
        if (res.data.orderInvoice != null) {
          this.orderInvoice = res.data.orderInvoice;
        }
        if (res.data.payPictureList != null) {
          this.urlList = res.data.payPictureList;
        }
        if (res.data.normalProductDetails != null) {
          this.productList = res.data.normalProductDetails;
        }
        if (res.data.presentProductDetails != null) {
          this.giftList = res.data.presentProductDetails;
        }
        if (res.data.orderLogistics != null) {
          this.logistics = res.data.orderLogistics;
        }
        this.num = res.data.orderNum;
        if (res.data.orderLogisticsRefund != null) {
          this.orderLogisticsRefundId = res.data.orderLogisticsRefund.id
        }
          
        if (res.data.dtcId != 0 && res.data.dtcId != null){
          this.rolHeadId = res.data.dtcId
        }
        if (res.data.mdId != 0 && res.data.mdId != null) {
          this.rolMdId = res.data.mdId
        }

        console.log(this.logistics)
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });

  }
  //跳转至“付款凭证”
  toPaymentVoucher() {
    let id = this.navParams.get("id");
    var money;
    if (this.orderInfo.discountAmount > "0"){
      money = this.orderInfo.discountAmount;
    }else{
      money = this.orderInfo.orderMoney;
    }
    let code = this.orderInfo.orderNum;
    this.navCtrl.push(PaymentVoucherPage, {
      'id': id,
      'urlList': this.urlList,
      'money': money,
      'code': this.orderInfo.orderNum
    });
  }
  //跳转至“物流详情”
  toLogistics(id) {
    this.navCtrl.push(LogisticsPage, {
      'id': id
    });
  }
  //跳转至“礼品列表”
  toGiftList() {
    this.navCtrl.push(GiftListPage);
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
  // 付款码
  toCodes() {
    var money;
    if (this.orderInfo.discountAmount > "0") {
      money = this.orderInfo.discountAmount;
    } else {
      money = this.orderInfo.orderMoney;
    }

    this.navCtrl.push(QrCodePage, {
      'id': this.orderInfo.memberId,
      'money': money,
      'pay': this.orderInfo.preparePay,
      'code': this.orderInfo.orderNum,
      'isLogisticsOrder': this.orderInfo.isLogisticsOrder,
    });
  }
  // 取消订单
  cancelOrder() {
    this.cancelOrd();
  }
  //退货
  returnOrder() {
    this.navCtrl.push(ReturnOrderPage, {
      'id': this.orderId
    });
  }
  //完善退货信息
  logisticsOrder() {
    this.navCtrl.push(LogisticsOrderPage, {
      'id': this.orderId
    })
  }
  // 确认收货
  confirmGoods() {
    this.showConfirmCtrl("是否确认收货?", 8);
  }
  // 询问弹框
  showConfirmCtrl(mssage, status) {
    let self = this;
    this.httpService.alert(mssage, function () {
      self.changeOrderStatus(status);
    })
  }
  // 更改订单状态
  changeOrderStatus(status) {
    this.httpService.get(AppConfig.API.changeOrderStatus + this.orderId + "/" + status).subscribe(res => {
      console.log(res);
      let code = res.code;
      if (code == 100000) {
        this.httpService.showToast("操作成功", '');
        this.navCtrl.pop();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });

  }
  //取消订单
  cancelOrd() {
    let data = {
      orderId: this.orderId
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
  // ------------DTC Head 审批 ---------------
  //确认审批弹窗
  approvalAlert() {
    console.log(this.roleName);
    let that = this;
    this.httpService.alert('是否确认审批通过？', function () {
      if (that.roleName == 'DTC Head'){
        that.confirmApproval()
      } else if (that.roleName == 'Manager Director'){
        that.MDConfirmApproval()
      }
    })
  }

  //确认退货弹窗
  apprefund() {
    console.log(this.roleName);
    let that = this;
    this.httpService.alert('是否确认退货通过？', function () {
        that.apprefundReturn()
    })
  }



  // dtc 确认审批
  confirmApproval() {
    this.approvalInfo = {
      orderId: this.orderId,
      mdId: this.mdId,
      mdName: this.mdName
    }
    this.httpService.post(AppConfig.API.confirmApprovalInfo, this.approvalInfo).subscribe(res => {
      console.log('确认审批', res)
      if (res && res.code == 100000) {
        // this.httpService.showToast('审批成功')
        this.navCtrl.pop()
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }
  //MD 确认审批
  MDConfirmApproval(){
    let data = {
      orderId: this.orderId,
      mdId: this.mdId,
      mdName: this.mdName
    }
    this.httpService.post(AppConfig.API.MDconfirmApproval, data).subscribe(res => {
      console.log('MD确认审批', res)
      if (res && res.code == 100000) {
        this.navCtrl.pop()
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }


  //审批
  approval() {
    console.log(this.approvalFlag)
    if (this.approvalFlag == false) {
      this.approvalAlert()
    } else if (this.approvalFlag == true) {
      this.showMDRadio()
    }
  }
  //选择需要审批的MD
  showMDRadio() {
    let alert = this.alertCtrl.create({
      title: '请选择需要审批的MD',
      inputs: this.MDlist,
      buttons: [
        {
          text: "ok",
          handler: data => {
            console.log(data)
            for (let item in this.MDlist) {
              if (this.MDlist[item].value == data) {
                this.mdName = this.MDlist[item].value
                this.mdId = this.MDlist[item].mdId;
                this.approvalAlert() 
                console.log(this.mdName, this.mdId)
              }
            }          
          }
        }, {
          text: "Cancel",
          handler: data => {
          }
        }]
    });
    alert.present();

  }
  //查询是否需要md审批
  mdApproval(id) {
    this.httpService.get(AppConfig.API.mdApprovalInquire + id).subscribe(res => {
      console.log('md', res)
      if (res.code == 100000) {
        this.approvalFlag = res.data
      }
      this.getUserInfo();
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  //查询MD列表
  getMdList() {
    this.httpService.post(AppConfig.API.getMDList, {
      roleName: "Manager Director"
    }).subscribe(res => {
      console.log('MDList', res)
      if (res && res.code == 100000) {
        this.MDlist = []
        for (let item in res.data) {
          this.MDlist.push({
            label: res.data[item].name,
            value: res.data[item].name,
            type: 'radio',
            checked: false,
            mdId: res.data[item].id
          })
        }
        this.MDlist[0].checked = true
        console.log('liebiao', this.MDlist)
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }
  //驳回订单
  reject() {
    this.overruleReason = '';
    this.isRejectShow = true;
    this.isReject = false
  }
  //驳回退款
  refund() {    
    this.overruleReasoninfo = '';
    this.isRefundShow = true;
    this.isReject = false;
  }

  //提交驳回信息
  submitReject() {
    let self = this;
    this.httpService.customAlert("驳回", "确定驳回申请?", function () {
      if (self.overruleReason == '') {
        self.httpService.showToast('请输入驳回理由');
        return false;
      } else if ( self.overruleReason != '') {
        if (self.roleName == 'DTC Head'){
          self.dtcRejectOrder()
        } else if (self.roleName == 'Manager Director'){
          self.MDRejectOrder()
        }
        
      }
    }, function () {

    })
  }

  //提交退货信息
  submitRefund() {
    let self = this;
    this.httpService.customAlert("退款", "确定退货申请?", function () {
      if (self.overruleReasoninfo == '') {
        self.httpService.showToast('请输入退货理由');
        return false;
      } else if (self.overruleReasoninfo != '') {
         self.rejectReason();
      }
    }, function () {

    })
  }


  // dtc head驳回订单
  dtcRejectOrder() {
    let data = {
      orderId: this.orderId,
      reason: this.overruleReason
    }
    this.httpService.post(AppConfig.API.rejectOrder, data).subscribe(res => {
      console.log('rejectOrder', res)
      if (res && res.code  == 100000) {
        this.close ()
        this.navCtrl.pop()
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }
  close(){
    this.isRejectShow=false
    this.isReject = true
    this.isRefundShow=false
  }
  // ------------MD 审批 ---------------
  MDRejectOrder(){
    let data = {
      orderId: this.orderId,
      reason: this.overruleReason
    }
    this.httpService.post(AppConfig.API.MDRejectOrder, data).subscribe(res => {
      console.log('MDRejectOrder', res)
      if (res && res.code  == 100000) {
        this.close ()
        this.navCtrl.pop()
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }

  //驳回退货
  rejectReason(){
    let data = {
      id: this.orderLogisticsRefundId,
      rejectReason: this.overruleReasoninfo
    }
    this.httpService.post(AppConfig.API.rejectReason, data).subscribe(res => {
                                                    
      if (res && res.code == 100000) {
        this.close()
        this.navCtrl.pop()
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }

  //提交退货申请
  apprefundReturn() {
    this.httpService.get(AppConfig.API.refundOrder + this.orderLogisticsRefundId).subscribe(res => {
      console.log('DTCTKRejectOrder', res)
      if (res && res.code == 100000) {
        this.httpService.showToast('退货成功');
        this.navCtrl.pop()
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('');
    });
  }



}
