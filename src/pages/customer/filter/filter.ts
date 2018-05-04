import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddShaixuanPage } from './../add-shaixuan/add-shaixuan';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
/**
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  title = '筛选条件';
   //加载图片
   Gengduo_img = AppConfig.ggengDuo_img;
   custom=[];
   fixed=[];
   ids=[];
   newIds=[];
   num:any;
   id:any;
   isShow=true;
   beginTime='';
   endTime='';
   money1;
   money2;
   showUserImg = false;
   showMenu = true;
   listArr={
    memberTagList:[],
    totalConsumeAccountStart:null,
    totalConsumeAccountEnd:null,
    lastBuyTimeStart:0,
    lastBuyTimeEnd:0,
    consumeNumStart:null,
    consumeNumEnd:null
   }
   
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage) {
  }

  ionViewWillLeave  (){
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '筛选客户';
    this.showMenu = true;
    this.storage.get('userinfo').then((val) => {
      if (val) {
        if (val.role.name =="Manager Director" ){
             this.isShow=false;
        }        
      } else {
       
      }
    }); 
    this.listArr.consumeNumStart=null;
    this.listArr.consumeNumEnd=null;
    this.listArr.totalConsumeAccountStart=null;
    this.listArr.totalConsumeAccountEnd=null;
    this.money1=null;
    this.money2=null;
    this.beginTime='';
    this.endTime='';
    this.getList();
    this.ids.length=0;
  }

  getList(){
    this.httpService.get(AppConfig.API.screenList).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.custom = res.data.custom;
        this.fixed = res.data.fixed;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  submit(id){  
      var index = this.ids.indexOf(id);
      this.num= index >= 0 ? false :true; 
     if(index>=0){
       this.ids.splice(index,1)
     }else{ 
       this.ids.push(id)
     }
    console.log(this.ids);
  }
    button(id){
      if (this.ids.length > 0) {
        var index = this.ids.indexOf(id);
        this.num = index >= 0 ? false : true;
        return this.num;
      }else{
        return true;
      }
     
    }
  
   buttons(id){
     if (this.ids.length > 0) {
       var index = this.ids.indexOf(id);
       this.num = index >= 0 ? true : false;
       return this.num;
     }
   }
  //校验
  // 表单验证
  check(form) {
    console.log(form)
    let reg = /^[0-9]+$/;
    if(form.totalConsumeAccountStart>0&&form.totalConsumeAccountEnd>0){
      if (form.totalConsumeAccountStart>=form.totalConsumeAccountEnd) {
        this.showToast('购买金额错误');
        return false;
      }
      if (!reg.test(form.totalConsumeAccountStart)) {
        this.showToast('金额最多为两位小数');
        return false;
      }
      if (!reg.test(form.totalConsumeAccountEnd)) {
        this.showToast('金额最多为两位小数');
        return false;
      }

    }
    if(form.lastBuyTimeStart>0&&form.lastBuyTimeEnd>0){
      if (form.lastBuyTimeStart>=form.lastBuyTimeEnd) {
        this.showToast('购买时间选择错误');
        return false;
      }
    }
    if(form.consumeNumStart>0&&form.consumeNumEnd>0){
      if (form.consumeNumStart>=form.consumeNumEnd) {
        this.showToast('购买次数错误');
        return false;
      }
      if (!reg.test(form.consumeNumStart)) {
        this.showToast('购买次数不能为小数');
        return false;
      }
      if (!reg.test(form.consumeNumEnd)) {
        this.showToast('购买次数不能为小数');
        return false;
      }
    }
    
    return true;
  }

  isEmpty(obj) {
    if (obj == null || obj == undefined || ("" + obj) == "") {
      return true;
    }
    return false;
  }
  //提示语
  showToast(msg) {
    this.httpService.showToast(msg);
  }
  
  next(){
    this.listArr.memberTagList = this.ids;
    this.listArr.lastBuyTimeStart = this.beginTime?new Date(this.beginTime).getTime()-8*60*60*1000:null;
    this.listArr.lastBuyTimeEnd = this.endTime?new Date(this.endTime).getTime()-8*60*60*1000+24*60*60*1000:null;
    this.listArr.totalConsumeAccountStart =this.money1? parseFloat((this.money1*100).toPrecision(12)):null;
    this.listArr.totalConsumeAccountEnd = this.money2?parseFloat((this.money2*100).toPrecision(12)):null;
    if(this.check(this.listArr)){
       this.navCtrl.push(AddShaixuanPage,{'list':this.listArr});
    }
   
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
  

}
