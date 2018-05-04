import { RejectOrderPage } from './../reject-order/reject-order';
import { ProductPage } from './../../products/product/product';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderAllPage } from '../order-all/order-all';
import { OrderDetailPage } from '../order-detail/order-detail';
import { LabelManagementPage } from '../../customer/label-management/label-management';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main'
import { ActiviAgainPage } from '../../activi/activi-again/activi-again';
import { Events } from 'ionic-angular';
import { LoginPage } from './../../log_in/login/login';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  pet: string = "dsp";  // 默认进来先选中待审批
  current_status = 10;
  title = '订单中心';
  memberId = "";  // 销售id
  showUserImg = true;
  showMenu = true;
  message = {
    headImg: ''
  };

  loadMore: boolean = true;

  dataList = [];

  approvalList = [];  // 审批
  waitPayList = [];   // 待付款列表
  waitSendList = [];  // 待发货
  waitReceiveList = []; // 待收货
  completeList = [];   // 已完成
  newList = [];        // 新订单
  //加载图片
  head_pash_img = AppConfig.head_img;
  Activity_img = AppConfig.Activity_img;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider, public storage: Storage,
    public events: Events) {
  }
  ionViewWillLeave() {
    this.showMenu = false;
    this.title = " ";
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.title = '订单中心';
    this.approvalList = [];  // 审批
    this.waitPayList = [];   // 待付款列表
    this.waitSendList = [];  // 待发货
    this.waitReceiveList = []; // 待收货
    this.completeList = [];   // 已完成
    this.newList = [];        // 新订单
    this.dataList = [];
    this.getSalesInfo();
    this.publishEvent();
  }

  publishEvent() {
    this.events.publish('number:shopping', Date.now());
  }
  // 获取销售信息
  getSalesInfo() {
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        var data = res.data;
        // self.showMessage(data);
        self.memberId = data.id

        if (self.pet == 'dsp') {
          self.getApproval(self.memberId, 0); // 待审批
        }

        if (self.pet == 'dfk') {
          self.getOrderList(1, self.memberId, 0);  // 待付款
        }

        if (self.pet == 'dfh') {
          self.getOrderList(6, self.memberId, 0);  // 待发货
        }

        if (self.pet == 'dsh') {
          self.getOrderList(7, self.memberId, 0);  // 待收货
        }
        if (self.pet == 'ywc') {
          self.getCompleted(self.memberId, 0);  // 已完成
        }

        if (self.pet == 'xdd') {
          self.getReject(self.memberId, 0);  // 新订单
        }

      } else if (res.code === 0) {
        self.httpService.modalTo(LoginPage);
      }
    })
  }

  // 获取审批列表
  getApproval(memberId, orderId, callback?) {
    var data = {
      memberId: memberId,
      orderId: orderId,
      channel: 0
    };

    this.httpService.posts(AppConfig.API.approvalList, data).subscribe(res => {
      let code = res.code;
      console.log(res.data)
      if (code === 100000) {
        // this.approvalList = this.approvalList.concat(res.data);

        this.dataList = this.dataList.concat(res.data);

        if (res.data.length < 10) {

          this.loadMore = false;
          if (orderId == 0) {

          } else {
            this.httpService.showToast('暂无更多');
          }
        } else {
          this.loadMore = true;
        }
        callback && callback(res);
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  // 获取已完成列表
  getCompleted(memberId, orderId, callback?) {
    var data = {
      memberId: memberId,
      orderId: orderId,
      channel: 0
    };

    this.httpService.posts(AppConfig.API.completedList, data).subscribe(res => {
      let code = res.code;
      console.log(res.data)
      if (code === 100000) {
        // this.approvalList = this.approvalList.concat(res.data);

        this.dataList = this.dataList.concat(res.data);

        if (res.data.length < 10) {

          this.loadMore = false;
          if (orderId == 0) {

          } else {
            this.httpService.showToast('暂无更多');
          }
        } else {
          this.loadMore = true;
        }
        callback && callback(res);
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  // 获取被驳回列表
  getReject(memberId, orderId, callback?) {
    var data = {
      memberId: memberId,
      orderId: orderId,
      channel: 0
    };

    this.httpService.posts(AppConfig.API.rejectList, data).subscribe(res => {
      let code = res.code;
      console.log(res.data)
      if (code === 100000) {
        // this.approvalList = this.approvalList.concat(res.data);

        this.dataList = this.dataList.concat(res.data);

        if (res.data.length < 10) {

          this.loadMore = false;
          if (orderId == 0) {

          } else {
            this.httpService.showToast('暂无更多');
          }
        } else {
          this.loadMore = true;
        }
        callback && callback(res);
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  // 获取订单列表 status:订单状态  memberId:销售id
  getOrderList(status, memberId, orderId, callback?) {
    var data = {
      memberId: memberId,
      status: status,
      orderId: orderId,
      channel: 0
    };

    this.httpService.posts(AppConfig.API.orderList, data).subscribe(res => {

      let code = res.code;
      if (code === 100000) {
        this.dataList = this.dataList.concat(res.data);

        if (res.data.length < 10) {

          this.loadMore = false;
          if (orderId == 0) {

          } else {
            this.httpService.showToast('暂无更多');
          }

        } else {
          this.loadMore = true;
        }

        callback && callback(res);

      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      alert(error);
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  // 获取当前订单状态
  currentStatus(current) {
    this.loadMore = true;
    this.current_status = current;
    this.dataList = [];
    if (current == 10) {
      this.getApproval(this.memberId, 0);
    } 
    if (current == 8) {
      this.getCompleted(this.memberId, 0);
    }
    if (current == 13) {
      this.getReject(this.memberId, 0);
    }else {
      this.getOrderList(current, this.memberId, 0);
    }

  }

  // 根据status 返回文字
  getStatus(status,subStatus) {
    var msg = "";
    switch (status) {
      case 1:
        msg = "待支付";
        break;
      case 2:
        msg = "已支付";
        break;
      case 3:
        msg = "支付失败";
        break;
      case 4:
        msg = "已取消";
        break;
      case 5:
        msg = "已退款";
        break;
      case 6:
        msg = "待发货";
        break;
      case 7:
        msg = "待收货";
        break;
      case 8:
        msg = "已完成";
        break;
      case 9:
        msg = "待退款";
        break;
      case 10:
        msg = "待审批（DTC Head)";
        break;
      case 11:
        msg = "待审批 (MD)";
        break;
      case 12:
        msg = "待财务复核";
        break;
      case 13:
        msg = "被驳回";
        break;
      case 14:
        msg = "待审批退货";
        break;
      case 15:
        msg = "完善退货信息";
        break;
      case 16:
        msg = "退货中";
        break;       
    }

    if (status == 8 && subStatus == 4) {
      msg = "退货申请被驳回";
    }

    return msg;
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.loadMore = false;
    if (this.current_status == 10) {
      // this.approvalList = [];
      this.dataList = [];
      this.getApproval(this.memberId, 0, function (data) {
        refresher.complete();
      });
    }
    else if (this.current_status == 8) {
      // this.approvalList = [];
      this.dataList = [];
      this.getCompleted(this.memberId, 0, function (data) {
        refresher.complete();
      });     
    }
    else if (this.current_status == 13) {
      // this.approvalList = [];
      this.dataList = [];
      this.getReject(this.memberId, 0, function (data) {
        refresher.complete();
      });

    } else {
      switch (this.current_status) {
        case 1:
          this.waitPayList = [];
          break;
        case 6:
          this.waitSendList = [];
          break;
        case 7:
          this.waitReceiveList = [];
          break;
      }

      this.dataList = [];
      this.getOrderList(this.current_status, this.memberId, 0, function (data) {
        refresher.complete();
      });

    }

  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    if (this.current_status == 10) {
      let info = this.dataList[this.dataList.length - 1];
      console.log(info.id);
      if (info.id) {
        this.getApproval(this.memberId, info.id, function (data) {
          infiniteScroll.complete();
        });
      } else {
        infiniteScroll.complete();
      }
    } 
    else if (this.current_status == 8) {
      let info = this.dataList[this.dataList.length - 1];
      console.log(info.id);
      if (info.id) {
        this.getCompleted(this.memberId, info.id, function (data) {
          infiniteScroll.complete();
        });
      } else {
        infiniteScroll.complete();
      }
    }
    else if (this.current_status == 13) {
      let info = this.dataList[this.dataList.length - 1];
      console.log(info.id);
      if (info.id) {
        this.getReject(this.memberId, info.id, function (data) {
          infiniteScroll.complete();
        });
      } else {
        infiniteScroll.complete();
      }
    }else {

      let info = this.dataList[this.dataList.length - 1];

      if (info.id) {
        this.getOrderList(this.current_status, this.memberId, info.id, function (data) {
          infiniteScroll.complete();
        });
      } else {
        infiniteScroll.complete();
      }

    }

  }

  // 头像
  showMessage(data) {
    // 获取会员信息          
    this.message = data;
    if (!data.headImg) {
      this.message.headImg = AppConfig.head
    } else {
      this.message.headImg = data.headImg
    }
  }

  // 全部订单
  toOrderAll() {
    if (this.memberId) {
      this.navCtrl.push(OrderAllPage, { id: this.memberId });
    } else {
      this.httpService.showToast("暂无信息,请稍后再试", '');
    }
  }

  // 快速下单
  toproducts() {
    this.navCtrl.parent.select(2);
  }
  // 订单详情
  toOrderDetail(id, status, isLogisticsOrder) {
    console.log(status);
    if (status == 13 && isLogisticsOrder == 1) {
      this.navCtrl.push(RejectOrderPage, { id: id });
    } else if (status == 13 && isLogisticsOrder == 0){
      this.navCtrl.push(ActiviAgainPage, { id: id });
    } else if (status != 13) {
      this.navCtrl.push(OrderDetailPage, { id: id });
    }
  }

  // 购物车
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }

  // 消息
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }

  // 设置
  settings() {
    this.navCtrl.push(SetupPage)
  }

}
