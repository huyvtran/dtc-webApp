import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { ClientSortPage } from '../client-sort/client-sort';
import { SalesPage } from '../sales/sales';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Events } from 'ionic-angular';
import { LoginPage } from './../../log_in/login/login';
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  //标题
  title = '报表中心';
  showUserImg = true;
  showMenu = true;
  role = ""; // DTC Head 销售老大  DTC Sales 销售   Training Team Head  
  loadMore: boolean = true;
  start = 0; // 分页page
  rows = 10; //业数
  tab = 0;   //表头数据切换  0=== 月度数据  1=== 年度数据
  saleTab = 0;  // DTC Head 下  销售信息切换  0=== 销售金额  1=== 其他信息
  ruleName ="yearMoney";
  //加载图片
  head_pash_img = AppConfig.head_img;
  avatar_img = AppConfig.head;
  message = {
    headImg: ''
  };
  salesData = {
    orderMoney: 0,  //销售金额
    orderNum: 0, //订单数
    buyCustomerNum: 0, //购买客户
    activityNum: 0, //活动场次
    activityCustomerNum: 0, //参与活动客户
    newCustomerNum: 0, //新增客户
    monthActivityNum: 0, //Training Team Head   月活动场次
    yearActivityNum: 0 //Training Team Head   年活动场次
  };
  // 销售排名 客户排名
  dataList = [];
  loading;
  constructor(public navCtrl: NavController, private httpService: HttpServiceProvider, public navParams: NavParams, private storage: Storage, public loadingCtrl: LoadingController, public events: Events) {
  }
  ionViewWillLeave() {
    this.showMenu = false;
    //隐藏
    this.title = '';
  }
  ionViewWillEnter() {
    this.start = 0;
    this.showMenu = true;
    this.dataList = [];
    this.loadMore = true;
    this.title = '报表中心';
    this.tab = 0;
    this.saleTab = 0;
    // let self = this;
    // this.httpService.getContent(function (res) {
    //   console.log("会员信息", res);
    //   if (res.code === 100000) {
    //     var data = res.data;
    //     self.showMessage(data);
    //   }
    // });
    this.storage.get('userinfo').then((val) => {
      if (val) {
        this.role = val.role.name;
        if(val.role.name=='Manager Director'){
          this.role = 'DTC Head'
        }
        this.changeDate(this.tab);
        this.getSortList();
        this.publishEvent();
      }
    });
  }
  publishEvent() {
    this.events.publish('number:shopping', Date.now());
  }
  // 表头数据
  changeDate(tab) {
    this.tab = tab;
    let api = '';
    if (this.role == 'DTC Head') {
      api = AppConfig.API.getSaleHeaderData + tab;
    } else if (this.role == 'DTC Sales') {
      api = AppConfig.API.getSaleData + tab;
    } else if (this.role == 'Training Team Head') {
      api = AppConfig.API.getLeaderData;
    } else {
      this.httpService.showToast('您无查看权限');
    }
    this.httpService.posts(api, {}).subscribe(res => {
      console.log(tab + "表头数据", res);
      if (res.code == 100000) {
        if (res.data) {
          this.salesData = res.data;
        } else {
          for (let i in this.salesData) {
            this.salesData[i] = 0;
          }
        }
      } else if (res.code == 0) {
        this.httpService.modalTo(LoginPage);
      }
    }, error => {
      this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  SortList(ruleName){
    this.start = 0;
    this.dataList = [];
    this.loadMore = true;
    this.ruleName = ruleName;
    this.getSortList();
  }

  getSortList(callback?) {
    console.log(this.ruleName);
    let param = {
      start: this.start,
      rows: this.rows,
      ruleName: this.ruleName
    };
    let api = '';
    switch (this.role) {
      case "DTC Head":
        api = AppConfig.API.marketSort;
        break;
      case "DTC Sales":
        api = AppConfig.API.customersSort;
        break;
      case "Training Team Head":
        api = AppConfig.API.getLeaderTableData;
        break;
      default:
        break;
    }
    this.httpService.posts(api, param).subscribe(res => {
      console.log(this.role + "角色表格数据", res);
      if (res.code == 100000) {
        if (res.data.length <= 0 && this.start > 0) {
          this.loadMore = false;
          this.httpService.showToast('暂无更多');
        } else {
          this.dataList.push.apply(this.dataList, res.data);
          this.start = this.start + this.rows;
          callback&&callback();
        }
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.loadMore = true;
    this.dataList = [];
    this.start = 0;
    this.getSortList(function(){
      refresher.complete();
    });
    
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.getSortList(function(){
      infiniteScroll.complete();
    });
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

  //客户排名
  toSortList() {
    this.navCtrl.push(ClientSortPage);
  }

  toSaleReport(id) {
    this.navCtrl.push(SalesPage, { id });
  }

  //点击"销售金额"
  saleMoney() {
    this.saleTab = 0;
  }

  //点击"其他信息"
  otherMsg() {
    this.saleTab = 1;
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
