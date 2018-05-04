import { PurchaseRecordPage } from './../../customer/purchase-record/purchase-record';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { InvoicesPage } from '../invoices/invoices';
import { DeliveryPage } from '../delivery/delivery';
import { HistoryPage } from '../history/history';
import { TestPage } from '../../test/test';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { App } from 'ionic-angular';
import { ConsumptionCurvePage } from "../consumption-curve/consumption-curve"


/**
 * Generated class for the Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  title = '客户详情';
  //加载图片
  Jiben_img = AppConfig.jiBen_img;
  Qita_img = AppConfig.qiTa_img;
  Shouhuo_img = AppConfig.shouHuo_img;
  Fapiao_img = AppConfig.faPiao_img;
  Goumai_img = AppConfig.gouMai_img;
  Tixing_img = AppConfig.tiXing_img;

  Head_img = AppConfig.head;
  employeeId:any;
  show=true;
  details={"lastBuyTime":'',"createTime":''};
  memberJoin=[];
  memberobjective=[];
  customerId:any;
  industry=[];
  preference=[];
  label=[];
  ofchannel=[];
  clean:any;
  isDe=true;
  isIon=true;
  z=true;
  x=false;
  showUserImg=false;
  showMenu = true;
  memberTypeCardName:any;
  //当前用户的名字
  username = "";
  lastTime;
  createTime;

  userInfo={
    gender:'',
    drinkFrequency:'',
    tier:''
  };
  constructor(
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams, 
    public App: App,) {
  }

  ionViewWillLeave() {
    this.title = '';
    this.showMenu = false;
  }
  ionViewWillEnter (){
    this.showMenu = true;
    this.industry=[];
    this.memberJoin=[];
    this.preference=[];
    this.memberobjective=[];
    this.ofchannel=[];
    this.label = [];
    // this.details=[];
    
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        var data = res.data;
        console.log(data);
        self.employeeId = res.data.id;
      }
    })
    this.title = "客户详情";
    this.getDetails();
  }

  getDetails() {
    this.customerId= this.navParams.get("id");
    console.log(this.customerId)
    this.httpService.get(AppConfig.API.personnelDetails + this.customerId).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) { 
         this.clean = res.data.clean;
          if(res.data.clean){
              this.show=false;
              this.z=false;
              this.x=true;
           }     
           this.username = res.data.username;
           console.log(this.username);

           var tel = res.data.globalRoaming;

           tel=tel.slice(1);

           console.log(tel)
          
          if (res.data.birthday){ 
            var birthday = new Date(res.data.birthday);
              res.data.birthday =(birthday.getMonth() + 1) + '-' + birthday.getDate(); 
          }        
            
        if (res.data.memberType==1){
          this.memberTypeCardName="普通客户"
        } else if (res.data.memberType == 2){
          this.memberTypeCardName = "直销客户"
        }
        if (res.data.gender==1){
            this.userInfo.gender='男'
        } else if (res.data.gender == 2) {
          this.userInfo.gender = '女'
        } else if (res.data.gender == 3) {
          this.userInfo.gender = '其他'
        }

        if (res.data.drinkFrequency==1){
          this.userInfo.drinkFrequency ="高于1次每周"
        } else if (res.data.drinkFrequency == 2) {
          this.userInfo.drinkFrequency = "1次每周"
        } else if (res.data.drinkFrequency == 3) {
          this.userInfo.drinkFrequency = "2至3次每月"
        } else if (res.data.drinkFrequency == 4) {
          this.userInfo.drinkFrequency = "1次每月"
        } else if (res.data.drinkFrequency == 5) {
          this.userInfo.drinkFrequency = "低于1次每月"
        }


        if (res.data.tier==1){
          this.userInfo.tier ='Tier1'
        } else if (res.data.tier == 2) {
          this.userInfo.tier = 'Tier2'
        }
        else if (res.data.tier == 3) {
          this.userInfo.tier = 'Tier3'
        }
   
        if (res.data.ageRange==1){
          res.data.ageRange = '21-29'
        }
        else if (res.data.ageRange == 2) {
          res.data.ageRange = '30-40'
        }
        else if (res.data.ageRange == 3) {
          res.data.ageRange = '41-50'
        }
        else if (res.data.ageRange == 4) {
          res.data.ageRange = '50以上'
        }

         this.details = res.data;
         this.lastTime = this.details.lastBuyTime?this.getTime(this.details.lastBuyTime):0;
         this.createTime = this.details.createTime?this.getTime(this.details.createTime):0;
         console.log(this.getTime(this.details.createTime))

        var TagGroups = res.data.memberTagGroups;
        if (TagGroups){
          for (var i = 0; i < TagGroups.length; i++) {
            var names = TagGroups[i].tagGroupName;
            var eId = TagGroups[i].createUserId;
            var isFixedGroup = TagGroups[i].isFixedGroup;
            if (names == '行业') {
              this.industry = TagGroups[i].tagList
            }
            if (names == '爱好') {
              this.memberJoin = TagGroups[i].tagList
            }
            if (names == '酒类偏好') {
              this.preference = TagGroups[i].tagList
            }
            if (names == '主要购酒目的') {
              this.memberobjective = TagGroups[i].tagList
            }
            if (names == '日常购酒渠道') {
              this.ofchannel = TagGroups[i].tagList
            }
            if (TagGroups[i].createUserId != null && TagGroups[i].createUserId == this.employeeId && TagGroups[i].isFixedGroup == 0){
               this.label = TagGroups[i].tagList
            }
          }
        }
        this.storage.set("customerId", this.details);
       
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  //时间
  getTime(template) {
    let date = new Date(template);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let time = year+'-'+month+'-'+day;
    return time;
  }
  ionshow(){
    var other = document.getElementById("other");
    var more = document.getElementById("more");
    other.style.display = "block";
    more.style.display = "none";
  }
  
  ionedit(){
    this.navCtrl.push(EditPage,{
      'id': this.customerId
    });
  }
  
  ionInvoice(){
    this.navCtrl.push(InvoicesPage,{
      'id': this.customerId,
      'clean': this.clean
    });
  }
  
  delivery(){
    this.navCtrl.push(DeliveryPage,{
      'id': this.customerId,
      'clean':this.clean
    });
  }
  history(){
    this.navCtrl.push(PurchaseRecordPage, {
      'id': this.customerId
    });
  }
  //跳转提醒页面
  test(){
    this.navCtrl.push(TestPage,{"id":this.customerId,"username":this.username});
  }

  tests() {
    this.httpService.showToast('您无法创建提醒');
  }

  shopping(){  
   
    console.log(this.details); 
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(2);
  }
  shoppings() {
    this.storage.remove("customerId");
    this.httpService.showToast('您无法快速下单');
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
  getCruve(){
    this.navCtrl.push(ConsumptionCurvePage,{"id":this.customerId})
  }

}
