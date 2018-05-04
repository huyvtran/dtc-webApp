import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { DetailsPage } from '../../customer/details/details';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the ClientSortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-sort',
  templateUrl: 'client-sort.html',
})
export class ClientSortPage {
  showUserImg = false;
  showMenu = true;
  //标题
  title = '客户排名';
  avatar_img = AppConfig.head;
  loadMore = true;
  dataList = [];
  start = 0; // 分页page
  rows = 10; //业数
  constructor(public navCtrl: NavController, private httpService: HttpServiceProvider, public navParams: NavParams) {
  }
  getdataList() {
    let param = {
      start: this.start,
      rows: this.rows
    }
    this.httpService.posts(AppConfig.API.getCustomerListBySale, param).subscribe(res => {
      console.log('客户排名', res);
      if (res.code == 100000) {
        if(res.data.length>0){
          this.dataList.push.apply(this.dataList,res.data);
          this.start = this.start + this.rows;
        }else{
          this.loadMore = false;
          this.httpService.showToast('暂无更多');
        }
      }else{
        this.httpService.showToast(res.msg,'');
      }
    }, error => {
      this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  ionViewWillLeave() {
    this.showMenu = false;
    //隐藏
    this.title = '';
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.start = 0;
    this.loadMore = true;
    this.dataList = [];
    this.title = '客户排名';
    console.log('ionViewDidLoad ClientSortPage');
    this.getdataList();
  }
  // 下拉刷新
  doRefresh(refresher) {
    this.loadMore = true;
    this.dataList = [];
    this.start = 0;
    this.getdataList();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.getdataList();
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
  toDetailsPage(id) {
    this.navCtrl.push(DetailsPage, { id });
  }
}
