import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivitycodePage } from '../activitycode/activitycode';
import { MailistPage } from '../mailist/mailist';
import { WriteoffPage } from '../writeoff/writeoff';
import { ViewwriteoffPage } from '../viewwriteoff/viewwriteoff';
import { SiteInformationPage } from "../site-information/site-information";
import { MaterialsPage } from '../materials/materials';
import { MaterialListsPage } from '../material-lists/material-lists';
import { RejectPage } from '../reject/reject';
import { Storage } from '@ionic/storage';

import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ApprovePage } from '../approve/approve';
import { OrganizerPage } from '../organizer/organizer';
import { OrderPlacePage } from './../order-place/order-place';
import { Keyboard } from '@ionic-native/keyboard';
import { CustomersPage} from '../../activi/customers/customers'
import { TrainerPage} from "../../activi/trainer/trainer"
/**
 * Generated class for the ActivitydetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activitydetails',
  templateUrl: 'activitydetails.html',
})
export class ActivitydetailsPage {
  title = '活动详情';
  showUserImg = false;
  showMenu=true;
  isHide=false;
  hide=true;
  trues=0;
  activityDetail='';
  eventId=0;
  role='';  //用户角色
  status=1; //活动状态
  subStatus=0; //活动状态子集
  addProvince=[];
  addCity=[];
  eventForm={
    'id':0,
    'actualNumber':'',
    "subStatus":0,
    "status":0,
    "createTime":'',
    'beginTime':'',
    "updateTime":'',
    'detailAddress':'',
    'estimatNumber':'',
    'estimateAveragePrice':'',
    'type':'',
    'saleId':'',
    'saleName': '',
    'approverId':'',
    'approverName':'',
    "organizerId":'',
    'organizerName':'',
    'provinceId':0,
    'overruleReason':'',
    'trainerId':'',
    'trainerName':'',
    'provinceName':'',
    'cityName':'',
    'cityId':0,
    'eventName':'',
    'eventId':0,
    'eventProductList':[],
    'warehouseCode':"",
    "secondApproverName":'',
    'secondApproverId':0,
    'thirdApproverId':0,
    'thirdApproverName':'',
    "creatorName":'',
    "ticket":'',
    "levelRelation":0
  };
  customerDetail = {
    'provinceName':'',
    'provinceId':0,
    'cityName':'',
    'cityId':0,
    'eventName':'',
    'eventId':0,
    'source':0,
    'levelRelation':0
  };
  isMoreBtn=false;//活动二维码，活动信息，现场信息
  isTrainer = false;//培训师
  isOrder=false;//活动订单
  isSale = false;  //sale
  isHead = false;  //Head
  isTraining = false;  //Training Team Head
  isAgency = false;  //Agency
  isRejectShow=false;
  read=false;
  actStatus='';
  isMetarial=true;
  modify=true;
  activityTime;
  oldTrainer;//原来的培训师
  activityStatus={'-1':'取消','1':'新活动','2':'审批','3':'指派培训','4':'进行中','5':'待核销','6':'已完成',}
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider,private storage: Storage,private keyboard: Keyboard) {
  }
  ionViewWillLeave (){
    this.showMenu=false;
    this.title = ' ';
  }
  ionViewWillEnter () {
    this.showMenu=true;
    this.title = '活动详情';
    this.eventId= this.navParams.get("id");
    this.eventForm.status==0?this.goActivityDetails(this.eventId): ''; 
  }
  //键盘监听
  ionViewDidLoad(){
    this.keyboard.hideKeyboardAccessoryBar(true);
    this.keyboard.disableScroll(true);

    //键盘弹出
    this.keyboard.onKeyboardShow().subscribe((e) => {
      var height = e.keyboardHeight;
      if(this.isRejectShow){
        let styles=document.getElementById('height');
        styles.style.bottom=height+"px";
      }else {
        let wrap = document.getElementById('detail-wrap');
        wrap.style.marginBottom=height+"px";
      } 
    });
    //键盘收回
    this.keyboard.onKeyboardHide().subscribe((e) => {
       if(this.isRejectShow){
        let sty = document.getElementById('height');
        sty.style.bottom = 0+'px';
      }else {
        let wrap = document.getElementById('detail-wrap');
        wrap.style.marginBottom=50+"px";
      }
    });
  }
  //获取详情
  goActivityDetails(id) {
    this.httpService.get(AppConfig.API.eventDetails+id).subscribe(res => {
      let code = res.code;
      if (code === 100000) {
        this.eventForm = res.data;
        this.eventForm.status=res.data.status;
        this.eventForm.subStatus=res.data.subStatus;
        this.oldTrainer = res.data.trainerId;
        this.getUserInfo();
        this.setTime();
        this.addsheng();
        this.actStatus = this.activityStatus[this.eventForm.status]?this.activityStatus[this.eventForm.status]:'';
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
}
   //获取user信息
   getUserInfo(){
    this.storage.get('userinfo').then((val) => {
      if (val) {
        this.role = val.role.name;
        this.judgeRole();
        if((this.role == "DTC Sales"&&this.eventForm.status==1)||(this.role == "DTC Head"&&this.eventForm.status==1)) {
          this.read=false;
          this.isMetarial=false;
        }else {
          this.read=true;
          this.isMetarial=true;
        }
        console.log('是否可修改',this.read);
      } else {
      }
    });
  }
  //角色按钮判断
  judgeRole() {
    console.log(this.role,this.eventForm.status,this.eventForm.subStatus)
    if(this.role=='DTC Sales') {
      if(this.eventForm.status==1 || this.eventForm.subStatus==7||this.eventForm.subStatus==9) {
        this.isSale = true;
      }
    }
    if(this.role=='DTC Head') {
      if(this.eventForm.status==2){
        this.isHead = true;
      }
    }
    if(this.role=='Training Team Head') {
      if(this.eventForm.status==3||this.eventForm.status==4){
        this.isTraining = true;
      }
      
    }
    if(this.role=='Agency') {
      if(this.eventForm.subStatus==6||this.eventForm.subStatus==8){
        this.isAgency = true;
      }
      
    }
    this.getDetailStatus();
  }
  //时间
  getTime(time) {
    var date = new Date(time);
    let Year = date.getFullYear();
    let Month = date.getMonth()+1;
    let Day = date.getDate();
    let Hour = date.getHours();
    let Minute = date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes();
    let Second= date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds();
    let uploadTime = Year+'年'+Month+'月'+Day+'日'+' '+Hour+':'+Minute+':'+Second;
    return uploadTime;
  }
  //根据活动状态显示提示内容
  getDetailStatus() {
    //新活动
    let updateTime = this.getTime(this.eventForm.updateTime);
    if(this.eventForm.status==1){
      this.activityDetail="信息填写完成后点击提交申请即可";
      if(this.eventForm.subStatus == 2) {
        this.activityDetail="活动申请于"+updateTime+"被"+this.eventForm.approverName+"驳回，驳回理由："+this.eventForm.overruleReason+"。请修改活动信息后重新提交。";
      }
      if(this.eventForm.subStatus == 3) {
        this.activityDetail="活动申请于"+updateTime+"被"+this.eventForm.secondApproverName+"驳回，驳回理由："+this.eventForm.overruleReason+"。请修改活动信息后重新提交。";
      }
      
    }
    if(this.eventForm.status==2) {
        console.log(this.isHead)
        if(this.isHead){
          this.activityDetail=this.eventForm.creatorName+'于'+updateTime+'提交活动，请尽快审批';
        }else {
          this.activityDetail="活动于"+updateTime+"提交审批，请等待"+this.eventForm.approverName+"审批。";
        }
    }
    if(this.eventForm.status==3) {
      this.activityDetail='活动于'+updateTime+'提交培训部，请等待'+this.eventForm.secondApproverName+'指派培训。'
      if(this.role=='Training Team Head') {
        this.activityDetail='活动申请于'+updateTime+'通过审批。请尽快指派培训师。'
      }
    }
    if(this.eventForm.status==4) {
      if(this.eventForm.subStatus == 6){
        this.activityDetail='活动于'+updateTime+'通过审批，等待Agency发货。';
        if(this.role=='Agency'){
          this.activityDetail='请尽快按照活动的物料信息发货';
        }
      }
      if(this.eventForm.subStatus == 7) {
        this.activityDetail='Agency已于'+updateTime+'发货';
        this.isMoreBtn = true;
      }
      
    }
    if(this.eventForm.status==5) {
      this.isMoreBtn = true;
      if(this.eventForm.subStatus==8){
        this.activityDetail='活动现场信息已于'+updateTime+'提交，等待Agency核销活动。'
        if(this.role=='Agency'){
          this.activityDetail=this.eventForm.creatorName+'已提交活动现场信息，请尽快确认产品已按照现场信息提交的数量入库'
        }
      }
      if(this.eventForm.subStatus==9) {
        this.activityDetail='Agency于'+updateTime+'驳回活动现场信息，驳回理由：'+this.eventForm.overruleReason+'。请修改活后重新提交。';
        if(this.role=='Agency'){
          this.activityDetail='等待'+this.eventForm.creatorName+'提交新的活动现场信息'
        }
      }
    }
    if(this.eventForm.status==6) {
      this.isMoreBtn = true;
      this.activityDetail='已完成'
    }
    console.log('',this.isMoreBtn)
  }
  // 解决时间控件时区问题
  setTime() {
    console.log('开始时间',this.eventForm.beginTime)
    this.eventForm.beginTime=this.eventForm.beginTime?new Date(parseInt(this.eventForm.beginTime) ).toISOString():''
  }
  // 添加省份
  addsheng() {
    this.httpService.get(AppConfig.API.sheng).subscribe(res => {
      let code = res.code;
      if (code === 100000) {
        this.addProvince = res.data[0].subCity;
        this.change(this.eventForm.provinceId,'addProvince');
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }
  // 添加城市
  change(id, type) {
    console.log(type,'111');
    if (type == "addProvince") {
      for(let i = 0; i < this.addProvince.length;i++){
        if(this.addProvince[i].cityId==this.eventForm.provinceId){
          this.eventForm.provinceName = this.addProvince[i].cityName;
          this.addCity = this.addProvince[i].subCity;
          console.log(this.addCity);
        }
      }
    }
    if(type == "addCity"){
      for(let i = 0; i < this.addCity.length;i++){
        if(this.addCity[i].cityId==this.eventForm.cityId){
          this.eventForm.cityName = this.addCity[i].cityName;
        }
      }
    }
  }
  //添加物料信息
  getMaterials() {
    if(this.eventForm.status==1){
      if(this.eventForm.type&& this.eventForm.cityName){
        this.navCtrl.push(MaterialsPage,{
          'list':this.eventForm.eventProductList,
          'isBtnShow':this.isMetarial,
          'type':this.eventForm.type,
          'cityName':this.eventForm.cityName,
          'resolve': this.MaterialsCallback})
      }else if(!this.eventForm.type) {
        this.showToast('请先选择活动类型');
      } else if(!this.eventForm.cityName) {
        this.showToast('请选择城市');
      }
    }else {
      this.navCtrl.push(MaterialListsPage,{'list':this.eventForm.eventProductList})
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
  // 选择现场销售
  goMailist() {
    if(!this.read){
      this.navCtrl.push(MailistPage,{resolve: this.salesCallback, saleId: this.eventForm.saleId})
    }
  }
  salesCallback = (data) =>{
    return new Promise((resolve, reject) => {
      this.eventForm.saleId = data.id;
      this.eventForm.saleName = data.name;
      console.log(this.eventForm.saleId,this.eventForm.saleName)
      resolve();
    });
  }
  //培训师
  traineClick() {
    if(this.isTraining) {
      this.navCtrl.push(MailistPage,{resolve: this.trainerCallback, saleId: this.eventForm.trainerId,trainer:'培训师'})
    }
    
  }
  trainerCallback = (data) =>{
    return new Promise((resolve, reject) => {
      this.eventForm.trainerId = data.id;
      this.eventForm.trainerName = data.name;
      resolve();
    });
  }
  //选择

  // 选择审批人
  approveClick(){
    if(!this.read){
      this.navCtrl.push(ApprovePage,{resolve: this.headCallback, approveId: this.eventForm.approverId});
    }
  }
  

  headCallback = (data) =>{
    return new Promise((resolve, reject) => {
      this.eventForm.approverId = data.id;
      this.eventForm.approverName = data.name;
      console.log(this.eventForm.approverId,this.eventForm.approverName)
      resolve();
    });
  }
  //选择training team head 审批人
  trainClick(){
    this.navCtrl.push(TrainerPage,{resolve: this.trainingCallback, secondApproverId: this.eventForm.secondApproverId});
  }
  trainingCallback = (data) =>{
    return new Promise((resolve, reject) => {
      this.eventForm.secondApproverId = data.id;
      this.eventForm.secondApproverName = data.name;
      resolve();
    });
  }
  // //选择agency 审批人
  // agencyClick(){
  //   this.navCtrl.push(ApprovePage,{resolve: this.agencyCallback, thirdApproverId: this.eventForm.thirdApproverId});
  // }
  // agencyCallback = (data) =>{
  //   return new Promise((resolve, reject) => {
  //     this.eventForm.thirdApproverId = data.id;
  //     this.eventForm.thirdApproverName = data.name;
  //     resolve();
  //   });
  // }
  // 组织者
  organizerClick(){
    if(!this.read){
      this.navCtrl.push(OrganizerPage,{resolve: this.organizerCallback, organizerId: this.eventForm.organizerId});
    }
  }
  organizerCallback = (data) =>{
    return new Promise((resolve, reject) => {
      console.log(data);
      this.eventForm.organizerId = data.id;
      this.eventForm.organizerName = data.username;
      resolve();
    });
  };
  //活动客户
  customerClick(){
    this.navCtrl.push(CustomersPage,{'eventId':this.eventForm.id})
  }
  
  //取消活动
  cancelActi(){
    let self = this;
    this.httpService.customAlert('取消活动','活动取消后将无法恢复，是否取消该活动',function() {
        self.updateFalse();
    },function(){

    })
  }
  //更新
  updateTrue() {
    if (this.check(this.eventForm)) {
      this.httpService.posts(AppConfig.API.confirmActivity,this.eventForm).subscribe(res => {
        let code = res.code;
        if (code === 100000) {
          this.navCtrl.pop();
        } else {
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('网络异常');
      });
    }
  }
  // 取消
  updateFalse() {
    this.httpService.posts(AppConfig.API.cancelActivity,this.eventForm).subscribe(res => {
      let code = res.code;
      if (code === 100000) {
        this.navCtrl.pop();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('网络异常');
    });
  }
  //保存草稿
  saveDraft() {
    let self = this;
    console.log('click');
    this.httpService.customAlert("保存草稿","确定保存草稿?", function () {
      self.eventForm.subStatus=1;
      self.updateTrue()
    },function(){
      
    })
  }
  //提交申请
  sub(){
    let self = this;
    this.httpService.customAlert("提交申请","确定提交活动申请?", function () {
      self.eventForm.subStatus=2;
      self.updateTrue()
    },function(){

    })
    
  }

  //确认
  confirm() {
    let self = this;
    this.httpService.customAlert("审批","确定审批申请?", function () {
      self.updateTrue()
    },function(){

    })
  }
  //驳回
  reject() {
    this.eventForm.overruleReason='';
    this.isRejectShow=true;
    console.log('驳回')
  }
  submitReject(){
    let self = this;
    this.httpService.customAlert("驳回","确定驳回申请?", function () {
      if(self.eventForm.overruleReason==''){
        self.showToast('请输入驳回理由');
        return false;
      }
      self.updateFalse();
    },function(){

    })
  }
  //确认发货
  confirmDelivery() {
    let self = this;
    this.httpService.customAlert("确认发货","是否确认发货?", function () {
      self.updateTrue()
    },function(){

    })
  }
  //现场下单
  siteOrder() {
    this.navCtrl.push(ViewwriteoffPage)
  }
  //后续发货
  delivery() {

  }
  //确认入库
  warehouse() {
    let self = this;
    this.httpService.customAlert("确认入库","是否确认入库?", function () {
      self.updateTrue()
    },function(){

    })
  }
  //更改培训师
  changeTrainer(){
    let self = this;
    this.httpService.customAlert("更改培训师","是否确认更改培训师?", function () {
      self.updateTrue()
    },function(){

    })
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
    if (form.estimatNumber < 0) {
      this.showToast('人数不能为负数');
      return false;
    }

    if (this.isEmpty(form.estimateAveragePrice)) {
      this.showToast('请填写人均费用');
      return false;
    }
    if (form.estimateAveragePrice<0) {
      this.showToast('费用不能为负数');
      return false;
    }

    if (this.isEmpty(form.approverId)) {
      this.showToast('请选择审批人');
      return false;
    }
    if(this.eventForm.status==2){
      console.log(form.secondApproverId)
      if(this.isEmpty(form.secondApproverId)){
        this.showToast('请选择培训师指派人');
        return false;
      }
    }
    if(this.eventForm.status==3||this.eventForm.status==4){
      if (this.isEmpty(form.trainerId)) {
        this.showToast('请选择培训师');
        return false;
      }
    }
    //活动时间晚于当前时间
    var nowTimeStamp  = new Date().getTime();
    var beginTemplate = new Date(this.eventForm.beginTime).getTime()-8*60*60*1000;
    if(beginTemplate<=nowTimeStamp){
      this.showToast('活动时间必得晚于当前时间');
      return false;
    }
    //更换培训师的时候，截止活动开始前一天
    if((this.isTraining&&this.eventForm.status==4&&this.eventForm.subStatus==6)||(this.isTraining&&this.eventForm.status==4&&this.eventForm.subStatus==7)){
      if (beginTemplate-beginTemplate>=24*60*60*1000) {
        this.showToast('请在活动开始前一天更改培训师');
        return false;
      }
      if(this.oldTrainer==this.eventForm.trainerId){
        this.showToast('请选择新的培训师');
        return false;
      }
    }
    return true;
  }

  goQRcode() {
    this.customerDetail.provinceName=this.eventForm.provinceName;
    this.customerDetail.provinceId=this.eventForm.provinceId;
    this.customerDetail.cityName=this.eventForm.cityName;
    this.customerDetail.cityId=this.eventForm.cityId;
    this.customerDetail.eventName=this.eventForm.eventName;
    this.customerDetail.eventId=this.eventForm.eventId;
    this.customerDetail.source=this.eventForm.id;
    this.customerDetail.levelRelation = this.eventForm.levelRelation;
    console.log(this.customerDetail,this.eventForm.ticket);
    this.navCtrl.push(ActivitycodePage,{customerDetail:this.customerDetail,ticket:this.eventForm.ticket})
  }
  goMailists() {
    this.navCtrl.push(MailistPage)
  }
  goWriteoff() {
    this.navCtrl.push(WriteoffPage)
  }
  goView() {
    this.navCtrl.push(ViewwriteoffPage)
  }
  getReject() {
    this.navCtrl.push(RejectPage)
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
  orderPlace(){
    this.navCtrl.push(OrderPlacePage, { id: this.eventForm.id, name:this.eventForm.eventName})
  }

  deliverGoods() {
    var data={
      id: this.eventForm.id, 
      name: this.eventForm.eventName
    }
    this.storage.set('activityMessage',data);
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(2);

    // this.navCtrl.push(ShoppingCartPage, { id: this.eventForm.id, name: this.eventForm.eventName})
  }
  //进入活动现场信息
  goSiteInfor(){
    if(this.isSale&&this.eventForm.subStatus==7) {
      this.modify = false;
    }
    if(this.isSale&&this.eventForm.subStatus==9) {
      this.modify = false;
    }
    this.navCtrl.push(SiteInformationPage,{resolve: this.siteInforCallback,'eventForm':this.eventForm,'read':this.modify})
  }
  siteInforCallback = (data) =>{
    return new Promise((resolve, reject) => {
      this.goActivityDetails(this.eventId);
      this.modify = true;
      resolve();
    });
  }
  back(){
    console.log('返回')
  }
}
