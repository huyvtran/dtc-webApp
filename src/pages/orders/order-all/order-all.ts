import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail'
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main'
/**
 * Generated class for the OrderAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-all',
  templateUrl: 'order-all.html',
})
export class OrderAllPage {
  title = '购买记录';
  showUserImg = false;
  showMenu = true;
  loadMore: boolean = true;
  salesId = "";   // 销售id
  dataList = [];  // 列表数据

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider) {
  }

  ionViewWillLeave() {
    this.showMenu = false;
    this.title = " ";
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.title = '购买记录';
  }

  ionViewDidLoad() {
    this.salesId = this.navParams.get("id");
    this.getList(this.salesId, 0);
  }

  // 获取全部订单列表
  getList(memberId, orderId) {
    var data = {
      memberId: memberId,
      status: 0,
      orderId: orderId,
    };

    this.httpService.posts(AppConfig.API.orderList, data).subscribe(res => {
      let code = res.code;
      if (code == 100000) {

        this.dataList = this.dataList.concat(res.data);

        if (res.data.length == 0 && orderId != 0) {
          this.loadMore = false;
          this.httpService.showToast('暂无更多');
        }

      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });

  }


  // 根据status 返回文字
  getStatus(status) {
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
      case 17:
        msg = "退货被驳回";
        break;
    }

    return msg;
  }

  // 订单详情
  toOrderDetail(id) {
    this.navCtrl.push(OrderDetailPage, { id: id });
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.loadMore = true;
    this.dataList = [];
    this.getList(this.salesId, 0);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    let info = this.dataList[this.dataList.length - 1];
    this.getList(this.salesId, info.id);
    setTimeout(() => {
      infiniteScroll.complete();
    }, 2000);
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
