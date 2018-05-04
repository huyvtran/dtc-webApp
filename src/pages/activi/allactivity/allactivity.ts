import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ActivitydetailsPage } from '../activitydetails/activitydetails';

/**
 * Generated class for the AllactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allactivity',
  templateUrl: 'allactivity.html',
})
export class AllactivityPage {
  activityList=[];
  page=1;
  pageSize=10;
  loadMore=true;
  loading;
  showUserImg = false;
  showMenu = true;
  title = " ";
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider,public loadingCtrl: LoadingController) {
  }
  ionViewWillLeave() {
    this.showMenu = false;
    this.title = " ";
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.title = '全部活动';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllactivityPage');
    this.loading = this.loadingCtrl.create({ content:"loading...",dismissOnPageChange:true, showBackdrop:true });
    this.loading.present();
    this.getAllActivity();
  }
//获取全部活动
  getAllActivity(callback?) {
    let self = this;
    var data = {
      "page":this.page,
      "pageSize":this.pageSize
    };
    this.httpService.posts(AppConfig.API.getAllActivity,data).subscribe(res => {
      let code = res.code;
      if (code === 100000) {
        if(res.data.data==null || res.data.data.length==0){
          if(this.page>1){
            this.loadMore=false;
            this.httpService.showToast('暂无更多');
          }
        }else {
            this.activityList =this.activityList.concat(res.data.data);
            this.loading.dismiss();
        } 
        callback && callback(res);
      } else {
        this.loading.dismiss();
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  //下拉刷新
  doRefresh(refresher){
    this.activityList =[];
    this.page=1;
    this.getAllActivity(function(data){
      refresher.complete();
    });
  }
  //上拉加载  
  doInfinite(infiniteScroll){
    this.page++;
    console.log('la');
    this.getAllActivity(function(data){
      infiniteScroll.complete();
    });
  }
  goActivityDetails(id){
    this.navCtrl.push(ActivitydetailsPage, { id: id});
  }
  //滚动加载

  // 根据status 返回文字
  getStatus(status) {
    var msg = "";
    switch (status) {
      case -1:
        msg = "取消";
        break;
      case 1:
        msg = "新活动";
        break;
      case 2:
        msg = "审批";
        break;
      case 3:
        msg = "指派培训";
        break;
      case 4:
        msg = "进行中";
        break;
      case 5:
        msg = "待核销";
        break;
      case 6:
        msg = "已完成";
        break;
    }
    return msg;
  }

}
