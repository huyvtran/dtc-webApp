import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddproductsPage } from '../addproducts/addproducts';
import { MailistPage } from '../mailist/mailist';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { MaterialsPage } from '../materials/materials';
import { ApprovePage } from '../approve/approve';
import { OrganizerPage } from '../organizer/organizer';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from './../../../app/main';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-createactivity',
  templateUrl: 'createactivity.html',
})
export class CreateactivityPage {
  title = '创建活动';
  showUserImg = false;
  showMenu=true;
  addProvince = [];
  addCity = [];
  eventForm = {
    'creatorId': "",   // 创建者
    'creatorName': "",
    'type': "",  // 活动类型
    'eventName': "",  // 活动名称
    'provinceId': '', // 省
    'provinceName': "",
    'cityId': '',   // 市
    'cityName': '',
    'beginTime': "",   // 活动开始时间
    'detailAddress': '',  // 地址
    'estimatNumber': '',   // 预估人数
    'estimateAveragePrice': "",      // 预估人均费用
    'saleId': '',     // 现场销售 id
    'saleName': "",    //销售名称
    'approverId': "",  // 审批人
    'approverName': "",
    'organizerId': '',    // 组织者
    'organizerName': "",
    'eventProductList': [],    // 物料清单
    'warehouseCode':"",    // 仓库
    'status':''
  };
  selectProvince = {
    title: '省',
    subTitle: 'Select your toppings',
    mode: 'md'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider, private storage: Storage) {

  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '创建活动';
    this.showMenu = true;
    this.addsheng();
    this.getUserInfo();
  }

  //获取user信息
  getUserInfo() {
    // this.storage.get('userinfo').then((val) => {
    //   if (val) {
    //     this.eventForm.creatorId = val.id;
    //     this.eventForm.creatorName = val.username;
    //   } else {

    //   }
    // });
    
    var self = this;
    this.httpService.getContent(function(res){
      if (res.code === 100000) {
            var data = res.data;
            self.eventForm.creatorId = data.id;
            self.eventForm.creatorName = data.name;
            
          }
    })

  }

  //创建活动
  ionViewDidLoad() {
    // 解决时间控件时区问题
    // this.eventForm.beginTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  }
  // 添加省份
  addsheng() {
    let self = this;
    this.httpService.addsheng(function (res) {
      if (res.code === 100000) {
        self.addProvince = res.data;
      }
    })
  }
   
  // 活动类型变化
  typeChange(){
    
    this.eventForm.eventProductList = [];
  }

  // 添加城市
  change(id, type) {
    this.eventForm.eventProductList = [];
    let self = this;
    if (type == "addProvince") {
      this.getProName(this.eventForm.provinceId);
      this.eventForm.cityId = "";
      this.eventForm.cityName = "";  // 重新

      this.httpService.addshi(id, function (res) {
        if (res.code === 100000) {
          self.addCity = res.data;
        }
      })
    }else{
      this.getCityName(this.eventForm.cityId);
    }

  }
  getAddproducts() {
    this.navCtrl.push(AddproductsPage);
  }

  // 选择现场销售
  goMailist() {
    this.navCtrl.push(MailistPage, { resolve: this.salesCallback, saleId: this.eventForm.saleId })
  }

  salesCallback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.eventForm.saleId = data.id;
      this.eventForm.saleName = data.name;
      resolve();
    });
  }

  // 选择审批人
  approveClick() {
    this.navCtrl.push(ApprovePage, { resolve: this.headCallback, approveId: this.eventForm.approverId });
  }

  headCallback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.eventForm.approverId = data.id;
      this.eventForm.approverName = data.name;
      resolve();
    });
  }

  // 组织者
  organizerClick() {
    this.navCtrl.push(OrganizerPage, { resolve: this.organizerCallback, organizerId: this.eventForm.organizerId });
  }
  organizerCallback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.eventForm.organizerId = data.id;
      this.eventForm.organizerName = data.username;
      resolve();
    });
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

  // 物料清单
  getMaterials() {
    if (this.eventForm.type && this.eventForm.cityName) {
      this.navCtrl.push(MaterialsPage,{type:this.eventForm.type,cityName:this.eventForm.cityName,list:this.eventForm.eventProductList,resolve: this.MaterialsCallback,})
    } else if(!this.eventForm.type) {
      this.showToast('请先选择活动类型');
    } else if(!this.eventForm.cityName) {
      this.showToast('请选择城市');
    }

  }

  MaterialsCallback = (data) =>{
    return new Promise((resolve, reject) => {
      console.log(data);
      this.eventForm.eventProductList = data.list;
      this.eventForm.warehouseCode = data.warehouse;
      resolve();
    });
  }

  // 提交申请
  sub() {
    if (this.check(this.eventForm)) {
        console.log(this.eventForm);
        this.createConfirm("提交申请","是否提交活动申请?","2");
    }
  }

  // 保存草稿
  draft(){
    if(this.eventForm.type){
      this.createConfirm("保存","是否保存活动申请?","1");
    }else{
      this.showToast("请先选择活动类型");
    }
  }

  getProName(id) {
    for (let i = 0; i < this.addProvince.length; i++) {
      if (this.addProvince[i].cityId == id) {
        this.eventForm.provinceName = this.addProvince[i].cityName;
      }
    }
  }

  getCityName(id) {
    for (let i = 0; i < this.addCity.length; i++) {
      if (this.addCity[i].cityId == id) {
        this.eventForm.cityName = this.addCity[i].cityName;
      }
    }
  }

  // 表单验证
  check(form) {
    if (this.isEmpty(form.type)) {
      this.showToast('请选择活动类型');
      return false;
    }
    if (this.isEmpty(form.eventName)) {
      this.showToast('请填写活动名称');
      return false;
    }

    if (this.isEmpty(form.beginTime)) {
      this.showToast('请选择活动时间');
      return false;
    }

    if (this.isEmpty(form.organizerId)) {
      this.showToast('请选择组织者');
      return false;
    }

    if (this.isEmpty(form.provinceId)) {
      this.showToast('请选择省份');
      return false;
    }
    if (this.isEmpty(form.cityId)) {
      this.showToast('请选择城市');
      return false;
    }

    if (this.isEmpty(form.detailAddress)) {
      this.showToast('请填写详细地址');
      return false;
    }
    if (this.isEmpty(form.estimatNumber)) {
      this.showToast('请填写预估人数');
      return false;
    }

    if (this.isEmpty(form.estimateAveragePrice)) {
      this.showToast('请填写人均费用');
      return false;
    }

    if (!this.eventForm.eventProductList || this.eventForm.eventProductList.length == 0) {
      this.showToast('请选择物料清单');
      return false;
    }

    if (this.isEmpty(form.approverId)) {
      this.showToast('请选择审批人');
      return false;
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

  //确认操作
  createConfirm(title,msg,status){
    let self = this;
    this.httpService.customAlert(title,msg, function () {
         self.startCreate(status);
    },function(){
      
    })
  }

  // 开始提交
  startCreate(status) {
    let self = this;
    this.eventForm.status = status;
      this.httpService.posts(AppConfig.API.createActivity, this.eventForm).subscribe(res => {
        console.log(res);
        if (res.code == 100000) {
            self.showToast("提交成功");
            self.navCtrl.pop();
        } else {
          self.showToast(res.msg);
        }
      })

  }


}


