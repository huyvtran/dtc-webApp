import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { ActivitydetailsPage } from '../activitydetails/activitydetails';
import { CreateactivityPage } from '../createactivity/createactivity';
import { AllactivityPage } from "../allactivity/allactivity";
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LoginPage } from './../../log_in/login/login';
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
  //头部的显隐
  title = '活动中心';
  page=1;
  pageSize=5;
  //加载图片
  head_pash_img = AppConfig.head_img;
  Activity_img = AppConfig.Activity_img;
  message = {
    headImg: ''
  };
  pet: string = "nsp";
  showUserImg = true;
  showMenu = true;
  eventList = [];
  status=1;
  eventForm={'subStatus':0};
  role='';
  isShowA=false;   //新活动1是否显示
  loadMore=true;
  loading;
  constructor(public navCtrl: NavController, private httpService: HttpServiceProvider,private storage: Storage,public loadingCtrl: LoadingController,
    public events: Events) {
  }

  ionViewWillLeave (){
    this.showMenu=false;
    this.title = ' ';
  }
  ionViewWillEnter() {
    this.showMenu=true;
    this.title = '活动中心';

    // let self = this;
    // this.httpService.getContent(function (res) {
    //   if (res.code === 100000) {
    //     var data = res.data;
    //     self.showMessage(data)
    //   }
    // })
    this.getEventLists(this.status);
    this.getUserInfo();
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
  getUserInfo(){
    this.storage.get('userinfo').then((val) => {
      if (val) {
        this.role = val.role.name;
      } else {

      }
    });
  }
  //判断是否显示新活动1
  isShowAct1(status,subStatus) {
    if(this.role == "DTC Sale") {
      this.isShowA = true;
    }else {
      
    }
    if(this.eventForm.subStatus!=2 && this.eventForm.subStatus!=3) {
      if(this.role != "DTC Sale"){
        return false;
      }
    }
  }
  
  //获取活动列表
  getEventLists(status){
    this.eventList =[];
    this.status = status;
    this.page=1;
    this.loading = this.loadingCtrl.create({ content:"loading...",dismissOnPageChange:true, showBackdrop:true });
    this.loading.present();
    this.getLists();
  }
  //分页获取活动列表
  getLists(callback?) {
    var data = {
      "status":this.status,
      "page":this.page,
      "pageSize":this.pageSize
    }; 
    this.httpService.posts(AppConfig.API.getActivityStatus, data).subscribe(res => {
      let code = res.code;
      if (code === 100000) {
        this.loading.dismiss();
        if(res.data.data==null || res.data.data.length==0){ 
          if(this.page>1){
            this.loadMore=false;
            this.httpService.showToast('暂无更多');
          }
        }else {
          this.eventList = this.eventList.concat(res.data.data);
          this.setDateShow();
          this.loadMore=true;
        }
        callback && callback(res);
      }
      else if (res.code === 0) {
        this.httpService.modalTo(LoginPage);
      }else {
        this.loading.dismiss();
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.loading.dismiss();
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  //下拉刷新
  doRefresh(refresher){
    this.eventList =[];
    this.page=1;
    this.getLists(function(data){
      refresher.complete();
    });
  }
  //上拉加载  
  doInfinite(infiniteScroll){
    this.page++;
    this.getLists(function(data){
      infiniteScroll.complete();
    });
  }
   //活动日期显示
   setDateShow() {
    for(let i = 0; i < this.eventList.length;i++){
      if(this.eventList[i].beginTime){
        this.eventList[i].beginTime-=8*60*60*1000;
      }
      if(this.eventList[i].endTime){
        this.eventList[i].endTime-=8*60*60*1000;
      }
    }
  }
  //获取详情
  goActivityDetails(id) {
    this.navCtrl.push(ActivitydetailsPage, { id: id});
  }
  createActivity() {
    this.navCtrl.push(CreateactivityPage)
  }
  getAllActivity() {
    this.navCtrl.push(AllactivityPage)
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
  goEqCode() {
    this.navCtrl.push(SetupPage)
  }


}
