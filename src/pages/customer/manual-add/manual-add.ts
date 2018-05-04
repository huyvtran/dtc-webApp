import { ChoosePage } from './../choose/choose';
import { CustomerPage } from './../customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from '../../messages/message/message';
import { ShoppingCartPage } from '../../orders/shopping-cart/shopping-cart';
import { AlertController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the ManualAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manual-add',
  templateUrl: 'manual-add.html',
})
export class ManualAddPage {
  title = '添加客户';
  s=true;
  x=true;
  show=false;
  hide=true;
  showUserImg = false;
  showMenu = true;
  glo='';
  glos = '';
  //加载图片
  Jiben_img = AppConfig.jiBen_img;
  Qita_img = AppConfig.qiTa_img;
  TianjiaBiaoqian_img = AppConfig.tianJiabiaoQian_img;
  Jiantou_img = AppConfig.jianTou_img;
  sjx_img = AppConfig.sjx_img;
  sqjp_img = AppConfig.sqjp_img;
  addProvince = [];
  addCity = [];
  addSource = [];
  addSale = [];
  addType = [];

  cId = '';
  userP = {
    province: ''
  };

  userN = {
    city: ''
  }

  join = [];
  join2 = [];
  industry = [];
  addJoin = [];
  memberJoin = [];
  memberJoin2 = [];
  preference = [];
  preference2 = [];
  memberobjective = [];
  memberobjective2 = [];
  channel=[];
  channel2 = [];
  label = [];
  label2 = [];
  message = [];
  lab=[];
  global:any;
  day:any;
  month:any;

  dataMessage=[];
  companyId: any;
  employeeId: any;
  monthList = [];
  dayList = [];
  tagLists = [];
  i = [];
  isShow = false;

  userInfo = {  
    companyId: '',
    tagList:this.dataMessage,
    firstName: '',
    secondName:'',
    age: '',
    birthday: '',
    post: '',
    corporation: '',
    gender: '',
    province: '',
    provinceName: '',
    city: '',
    cityName: '',
    spareTelFirst: '',
    spareTelSecond: '',
    spareTelThird: '',
    tier: '',
    email: '',
    remarks: '',
    tel:'',
    memberType:'',
    memberTypeCardName:'',
    wxNickname:'',
    drinkFrequency:'',
    globalRoaming:'',
    ageRange:'',
    eventName:'',
    source:0
  }
  customerDetail = {
    'provinceName':'',
    'provinceId':'',
    'cityName':'',
    'cityId':'',
    'eventName':'',
    'eventId':'',
    'source':0,
    'levelRelation':''
  }
  
  // 'fdskljfklas123klfdsjakl12312cxvzx'.replace(/[^\d]*/g, '')

  constructor(
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    public alertCtrl: AlertController,
    private keyboard: Keyboard,
    public navParams: NavParams) {
  }
  ionViewWillLeave(){
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter () {
    this.birthday();
    this.title = '添加客户';
    this.showMenu = true;
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        var data = res.data;
        self.type(data);
        self.companyId = res.data.companyId;
        self.userInfo.companyId = res.data.companyId;
        self.employeeId = res.data.id;
      }
    })
    this.addsheng();
    this.glos="86"; 
    
    this.addActivityCustomer();
    
  }
  //从活动页面手动添加的客户
  addActivityCustomer() {
    this.customerDetail= this.navParams.get("customerDetail")?this.navParams.get("customerDetail"):0;
    if(!this.customerDetail) {
      return;
    }
    this.title = '手工添加';
    this.userP.province = this.customerDetail.provinceId;
    this.userN.city = this.customerDetail.cityId;
    this.userInfo.eventName = this.customerDetail.eventName;
    this.userInfo.source = this.customerDetail.source;
    this.userInfo.tier = this.customerDetail.levelRelation;
  }


  // 区号其他
  other() {
    if (this.glos == '1') {
      this.show = true;
      this.httpService.showToast('请填写区号');
      return;
    }else{
      this.show = false;
    }
  }

  birthday(){
    this.monthList=[];
    for(let i=1;i<13;i++){
      var list={"name":i,"value":i};
      this.monthList.push(list);
    }
  }

  bChange(event){
    this.dayList=[];
    var day=0;
    switch (event){
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
          day=31;
          break;
      case 4:
      case 6:
      case 9:
      case 11:  
         day = 30;
         break; 
      case 2: 
         day = 29;
         break; 
      default:
         break;  
    } 
 
    for(let i=1;i<=day;i++){
      let  list={"name":i,"value":i}
       this.dayList.push(list)
    }
    
     console.log(event,this.dayList)
  }

  birth(){
    if (this.month){
      this.month = this.month <= 9 ? "0" + this.month : this.month;
      this.day = this.day <= 9 ? "0" + this.day : this.day;
      this.userInfo.birthday = '2000' + '-' + this.month + '-' + this.day;
      console.log(this.userInfo.birthday);
    }   
  }

  // 选择标签
  choose() {
    this.navCtrl.push(ChoosePage, { resolve: this.callback, userList: this.i });
  }

  callback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.lab = data;
      console.log(this.lab);
      for (let i = 0; i < data.length; i++) {
        var a = { tagId: data[i].id, tagGroupId: data[i].tagGroupId };
        this.dataMessage.push(a);
      }
      console.log(this.dataMessage)
      resolve();
    });
  }


  // 基本信息
  addCustomer() { 
   
    // 校验
    if (!this.userInfo.firstName) {
      this.httpService.showToast('请填写姓氏');
      return;
    }
    if (!this.userInfo.secondName) {
      this.httpService.showToast('请填写名字');
      return;
    }

    if (!this.glos) {
      this.httpService.showToast('请选择区号');
      return;
    }

    this.userInfo.globalRoaming = this.glos;
    if (this.userInfo.globalRoaming == "1" && this.glo == '') {
      this.httpService.showToast('请填写区号');
      return;
    }
    if (this.glo) {
      this.userInfo.globalRoaming = this.glo;
    }
    console.log(this.userInfo.globalRoaming);

    if (!this.userInfo.tel) {
      this.httpService.showToast('请填写手机号');
      return;
    } 

    if (this.userInfo.globalRoaming == '86') {
      var a = this.userInfo.tel;
      this.userInfo.tel=a.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel= this.userInfo.tel.replace(/[^\d]*/g, '');
        console.log(this.userInfo.tel);
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    }if (this.userInfo.globalRoaming == '852') {
      var b = this.userInfo.tel;
      this.userInfo.tel = b.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
        console.log(this.userInfo.tel);
        if (!(/^([6|9])\d{7}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    }if (this.userInfo.globalRoaming == '853') {
      var c = this.userInfo.tel;
      this.userInfo.tel = c.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
        console.log(this.userInfo.tel);
        if (!(/^[6]([8|6])\d{5}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    }if (this.userInfo.globalRoaming == '886') {
      var d = this.userInfo.tel;
      this.userInfo.tel = d.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
        console.log(this.userInfo.tel);
        if (!(/^[0]\d{9}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    }
    
    
    if (!this.userInfo.gender) {
      this.httpService.showToast('请选择性别');
      return;
    }

   

    if(this.userInfo.email){
      if ((!(/^[a-zA-Z0-9][\w\.]+@[\w\.]+\.[a-zA-Z]+$/.test(this.userInfo.email)))) {
        this.httpService.showToast('邮箱格式不正确');
        return;
      }
    }
    
  

    if (this.addProvince) {
      for (var i = 0; i < this.addProvince.length; i++) {
        let pId = this.addProvince[i].cityId;
        let pName = this.addProvince[i].cityName;
        if (this.userP.province == pId) {
          this.userInfo.province = pId;
          this.userInfo.provinceName = pName;
        }
      }
    }


    if (this.addCity) {
      for (var j = 0; j < this.addCity.length; j++) {
        let pId = this.addCity[j].cityId;
        let pName = this.addCity[j].cityName;
        if (this.userN.city == pId) {
          this.userInfo.city = pId;
          this.userInfo.cityName = pName;
        }
      }
    }

    if (!this.userInfo.provinceName) {
      this.httpService.showToast('请选择省份');
      return;
    }

    if (!this.userInfo.cityName) {
      this.httpService.showToast('请选择城市');
      return;
    }


    if (this.addType){
      for (var x = 0; x < this.addType.length; x++) {
        if (this.addType[x].id == this.userInfo.memberType) {
          this.userInfo.memberTypeCardName = this.addType[x].name
        }
      }
    }

  
    this.birth();

    var tagL = this.join.concat(this.memberJoin).concat(this.preference).concat(this.memberobjective).concat(this.channel);
    for (let i = 0; i < tagL.length; i++) {
      this.tagLists.push(tagL[i])
    }

    for (let i = 0; i < this.tagLists.length; i++) {
      var datas = { tagId: this.tagLists[i].id, tagGroupId: this.tagLists[i].tagGroupId }
      this.dataMessage.push(datas)
    }

    this.userInfo.tagList = this.dataMessage;  
    this.userInfo.globalRoaming = '+' + this.userInfo.globalRoaming;
    

    this.httpService.post(AppConfig.API.addCustomer, this.userInfo).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.return();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  // 添加省份
  addsheng() {
    let self=this;
    this.httpService.addsheng(function (res) {
      if (res.code === 100000) {
        self.addProvince = res.data;        
      }
    })
  }


  // 添加城市
  change(id,type) {
    let self = this;
    this.httpService.addshi(id,function (res) {
      if (res.code === 100000) {
        self.addCity = res.data;
      }
    })
  }



  //客户类型
  type(data) {
    console.log(data)
    let cId = data.companyId;
    this.httpService.get(AppConfig.API.customerType + cId).subscribe(res => {
      console.log(res)
      this.addType = res.data;

    })
  }

//保存后返回的地方，活动时手工添加的返回到活动详情页面
  return() {
    if(!this.customerDetail) {
      this.navCtrl.popToRoot()
    }else{
      this.navCtrl.remove(2,1)
      this.navCtrl.pop();
    }
  }

  // 点击添加
  submit() {
    this.addCustomer();
   
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

  radio() {
    this.isShow = true;
  }



  showCheckbox(type) {
    let self = this;
    let alert = self.alertCtrl.create();
    self.httpService.get(AppConfig.API.joinList + self.companyId).subscribe(res => {
      console.log(res)
      self.addJoin = res.data;
      if (self.addJoin) {
        alert.setTitle('请选择');
        for (var i = 0; i < self.addJoin.length; i++) {
          if (self.addJoin[i].tagGroupName == type) {
            self.industry = self.addJoin[i].tagList;
            a(self.industry)
          }
        }

      }
    })


    // 弹框选择
    function a(industry) {
      console.log(industry)
      for (let i = 0; i < industry.length; i++) {      
        var a
        if (type == "爱好") {
           a = self.join2.indexOf(industry[i].id) >= 0;
        }
        if (type == "行业") {
          a = self.memberJoin2.indexOf(industry[i].id) >= 0;
        }
        if (type == "酒类偏好") {
          a = self.preference2.indexOf(industry[i].id) >= 0;
        }
        if (type == "主要购酒目的") {
          a = self.memberobjective2.indexOf(industry[i].id) >= 0;
        }
        if (type == "客户标签") {
          a = self.label2.indexOf(industry[i].id) >= 0;
        }
        if (type == "日常购酒渠道") {
          a = self.channel2.indexOf(industry[i].id) >= 0;
        }

        alert.addInput({
          type: 'checkbox',
          label: industry[i].tagName,
          value: industry[i],
          checked:a
        });
      }

     

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: data => {
          console.log('Checkbox data:', data);
              if (type == "爱好") {
                self.join = data;
                self.join2=[];
                for (let g = 0; g < self.join.length;g++){
                    self.join2.push(self.join[g].id)
                }
                console.log(self.join2)
              }
              if (type == "行业") {
                self.memberJoin = data;
                self.memberJoin2=[];
                for (let g = 0; g < self.memberJoin.length; g++) {
                  self.memberJoin2.push(self.memberJoin[g].id)
                }
                console.log(self.join2)
              }
              if (type == "酒类偏好") {
                self.preference = data;
                self.preference2=[];
                for (let g = 0; g < self.preference.length; g++) {
                  self.preference2.push(self.preference[g].id)
                }
              }
              if (type == "主要购酒目的") {
                self.memberobjective = data;
                self.memberobjective2=[];
                for (let g = 0; g < self.memberobjective.length; g++) {
                  self.memberobjective2.push(self.memberobjective[g].id)
                }
              }
              if (type == "客户标签") {
                self.label = data;
                self.label2=[];
                for (let g = 0; g < self.label.length; g++) {
                  self.label2.push(self.label[g].id)
                }
              }

             if (type == "日常购酒渠道") {
                self.channel = data;
                self.channel2=[];
                for (let g = 0; g < self.channel.length; g++) {
                  self.channel2.push(self.channel[g].id)
                }
              }
          }         
      });
      alert.present();
    }

  }



}
