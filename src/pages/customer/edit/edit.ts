import { stringify } from '@angular/core/src/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChoosePage } from '../choose/choose';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  title = '编辑客户信息';

  public event = {
    month: '',
    timeStarts: '',
    timeEnds: '',
  }

  //加载图片
  Jiben_img = AppConfig.jiBen_img;
  Qita_img = AppConfig.qiTa_img;
  TianjiaBiaoqian_img = AppConfig.tianJiabiaoQian_img;
  Jiantou_img = AppConfig.jianTou_img;
  sjx_img = AppConfig.sjx_img
  glos='';
  glo='';
  customerId: any;
  id: any;
  details = [];
  shows = false;
  showUserImg=false;
  showMenu = true;
  hide = true;
  x=true;
  addProvince = [];
  addCity = [];
  addSource = [];
  addSale = [];
  addType = [];
  global=false;

  label = [];
  memberJoin = [];
  memberobjective = [];
  joi = [];
  joi2 = [];
  joi3 = [];
  joi4 = [];
  joi5 = [];
  joi6 = [];
  join = [];
  join2 = [];
  join3 = [];
  join4 = [];
  join5 = [];
  join6 = [];
  joins = [];
  joins2 = [];
  joins3 = [];
  joins4 = [];
  joins5 = [];
  joins6 = [];
  industry = [];
  addJoin = [];
  preference = [];
  message = [];
  lab=[];
  labs = [];
  tagLists=[];


  userP = {
    province: ''
  };

  userN = {
    city: ''
  }
month:any;
day:any;
  dataMessage = [];
  companyId: any;


  userInfo = {
    id: this.id,
    companyId: this.companyId,
    tagList: [''],
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
    name: '',
    remarks: '',
    tel: '',
    memberType: '',
    memberTypeCardName: '',
    wxNickname: '',
    drinkFrequency: '',
    email:'',
    globalRoaming:''
  }

  TagGroup = [];
  monthList = [];
  dayList = [];
 
  isCallback:boolean = false;

  constructor(
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }
  ionViewWillLeave(){
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter () {
    this.join=[];
    this.join2 = [];
    this.join3 = [];
    this.join4 = [];
    this.join6 = [];
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        var data = res.data;
        console.log(data)
        self.type(data);
        self.companyId = res.data.companyId;
        self.id = res.data.id;
      }
    })
    this.birthday();
    this.title = '编辑客户信息';  
    this.showMenu = true;
    this.addsheng();   
    this.getDetails();   
  }
  show(){
    console.log(this.userInfo.globalRoaming)
  }
  for(data) {
    this.lab=[];
    console.log(data);
    console.log(this.lab);
    for(let i=0;i<data.length;i++){
        this.lab.push(data[i])
    }
    console.log(this.lab);
  }


  // 显示save
  getDetails() {
    this.lab = [];
    this.customerId = this.navParams.get("id");
    console.log(this.customerId);
    this.httpService.get(AppConfig.API.personnelDetails + this.customerId).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {   
        console.log(this.userInfo);

        if (this.isCallback) {
          this.lab = this.labs;
        } else {
          if (res.data.globalRoaming) {
            res.data.globalRoaming = res.data.globalRoaming.slice(1);
            console.log(res.data.globalRoaming); 
            if (res.data.globalRoaming == "86" || res.data.globalRoaming == "852" || res.data.globalRoaming == "853" || res.data.globalRoaming == "886"){
              this.glos=res.data.globalRoaming;
            } else{
              this.shows=true;
              this.glos = '1';
              this.glo = res.data.globalRoaming;
            }           
          }
          this.userInfo = res.data;
        
          var TagGroups = res.data.memberTagGroups;
          this.TagGroup = TagGroups;
          if (TagGroups) {
            for (var i = 0; i < TagGroups.length; i++) {
              var names = TagGroups[i].tagGroupName;
              
              if (TagGroups[i].isFixedGroup == 1 && this.labs.length == 0) {
                this.for(TagGroups[i].tagList);
               
              }
              if (TagGroups[i].createUserId && this.labs.length == 0) {
                if (TagGroups[i].createUserId == this.id && TagGroups[i].isFixedGroup == 0) {
                  this.for(TagGroups[i].tagList);
                }
                
              }
            
              if (names == '爱好') {
                this.joins = TagGroups[i].tagList;
                this.join = this.joins;
  
                if (this.join) {
                  for (let i = 0; i < this.join.length; i++) {
                    this.joi.push(this.join[i].id);
                  }
                  console.log(this.joi);
                }
               
              }
              if (names == '行业') {
                this.joins2 = TagGroups[i].tagList;
                this.join2 = this.joins2;
  
                if (this.join2) {
                  for (let i = 0; i < this.join2.length; i++) {
                    this.joi2.push(this.join2[i].id);
                  }
                  console.log(this.joi2);
                }
              }
              if (names == '酒类偏好') {
                this.joins3 = TagGroups[i].tagList;
                this.join3 = this.joins3;
  
                if (this.join3) {
                  for (let i = 0; i < this.join3.length; i++) {
                    this.joi3.push(this.join3[i].id);
                  }
                  console.log(this.joi3);
                }
  
              }
              if (names == '主要购酒目的') {
                this.joins4 = TagGroups[i].tagList;
                this.join4 = this.joins4;
  
                if (this.join4) {
                  for (let i = 0; i < this.join4.length; i++) {
                    this.joi4.push(this.join4[i].id);
                  }
                  console.log(this.joi4);
                }
  
              }
              if (names == '客户标签') {
                this.joins5 = TagGroups[i].tagList;
                this.join5 = this.joins5;
                console.log(this.join5);
              }
              if (names == '日常购酒渠道') {
                this.joins6 = TagGroups[i].tagList;
                this.join6 = this.joins6;
                console.log(this.join6);
            
                if (this.join6) {
                  for (let i = 0; i < this.join6.length; i++) {
                    this.joi6.push(this.join6[i].id);
                  }
                  console.log(this.joi6);
                }
               
              }
            }
          }
  
  
          this.huixian(res.data);

        }


       
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


// 区号其他
  other(){
    if (this.glos == '1') {
      this.shows = true;
      return;
    } else if (this.glos != '1'){
      this.shows = false;
    }
  }
// 回显赋值
huixian(data){
        this.userP.province = this.userInfo.province;
        this.userN.city = this.userInfo.city;
        this.userInfo.memberType = this.userInfo.memberType;
        this.userInfo.tier = this.userInfo.tier;
        this.month = data.birthMonth;
        console.log(this.month);
        if (this.month){
          this.bChange(this.month);
          this.day = data.birthDaytime;
        }     
}

  //处理生日
  birth() {
    if (this.month && this.day){
        this.month = this.month <= 9 ? "0" + this.month : this.month;
        this.day = this.day <= 9 ? "0" + this.day : this.day;
        this.userInfo.birthday = '2000' + '-' + this.month + '-' + this.day;
    }
   
    console.log(this.userInfo.birthday);
  }



  return() {
    this.navCtrl.pop();
  }

  // 保存
  save() {
    this.addCustomer();

  }

  // 选择标签
  choose() {

    this.isCallback = true;

    console.log(this.userInfo.tagList);
    this.navCtrl.push(ChoosePage, { resolve: this.callback, userList: this.userInfo.tagList, id: this.navParams.get("id") });
  }

  callback = (data) => {
    this.lab=[];
    return new Promise((resolve, reject) => {
      console.log(data);
      this.lab=[];
      this.labs = [];
      this.labs=data;
      this.isCallback = true;
      console.log(this.labs);
      // for(let i=0;i<data.length;i++){
      //   var a = { tagId: data[i].id, tagGroupId: data[i].tagGroupId};
      //   this.dataMessage.push(a);
      // }  
      console.log(this.dataMessage) 
      resolve();
    });
  }

  

  // 编辑客户
  addCustomer() {
    
    if (!this.userInfo.firstName) {
      this.httpService.showToast('请填写姓氏');
      return;
    }
    if (!this.userInfo.secondName) {
      this.httpService.showToast('请填写名字');
      return;
    }

    if (!this.glos && this.shows == false) {
      this.httpService.showToast('请选择区号');
      return;
    }
    if (!this.glo && this.shows==true) {
      this.httpService.showToast('请填写区号');
      return;
    }

    if (this.glos && this.glos != '1' && this.shows == false) {
      this.userInfo.globalRoaming = this.glos;
    }

    if (this.glo && this.shows == true) {
      this.userInfo.globalRoaming = this.glo;
    }
  

    if (!this.userInfo.tel) {
      this.httpService.showToast('请填写手机号');
      return;
    }
    
    if (this.userInfo.globalRoaming == '86') {
      var a = this.userInfo.tel;
      this.userInfo.tel = a.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    } if (this.userInfo.globalRoaming == '852') {
      var b = this.userInfo.tel;
      this.userInfo.tel = b.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
        if (!(/^([6|9])\d{7}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    } if (this.userInfo.globalRoaming == '853') {
      var c = this.userInfo.tel;
      this.userInfo.tel = c.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
        if (!(/^[6]([8|6])\d{5}$/.test(this.userInfo.tel))) {
          this.httpService.showToast('手机号格式不正确');
          return;
        }
      }
    } if (this.userInfo.globalRoaming == '886') {
      var d = this.userInfo.tel;
      this.userInfo.tel = d.trim();
      if (this.userInfo.tel) {
        this.userInfo.tel = this.userInfo.tel.replace(/[^\d]*/g, '');
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

   

    if (this.userInfo.email) {
      if ((!(/^[a-zA-Z0-9][\w\.]+@[\w\.]+\.[a-zA-Z]+$/.test(this.userInfo.email)))) {
        this.httpService.showToast('邮箱格式不正确');
        return;
      }
    }


 

    var tagL = this.join.concat(this.join2).concat(this.join3).concat(this.join4).concat(this.join6);
    for (let i = 0; i < tagL.length; i++) {
      this.tagLists.push(tagL[i])
    }
    console.log(this.tagLists);

    // if (this.tagLists.length > 0) {
    //   for (let i = 0; i < this.tagLists.length; i++) {
    //     var datas = { tagId: this.tagLists[i].id, tagGroupId: this.tagLists[i].tagGroupId }
    //     this.dataMessage.push(datas)
    //   }
    // }

       for (let i = 0; i < this.tagLists.length; i++) {
        var datas = { tagId: this.tagLists[i].id, tagGroupId: this.tagLists[i].tagGroupId }
        this.dataMessage.push(datas)
      }

      for(let i=0;i<this.lab.length;i++){
        var as = { tagId: this.lab[i].id, tagGroupId: this.lab[i].tagGroupId};
        this.dataMessage.push(as);
      }  

  
    this.userInfo.tagList = this.dataMessage;
    console.log(this.dataMessage, this.userInfo.tagList)


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

    if (this.addType) {
      for (var x = 0; x < this.addType.length; x++) {
        if (this.addType[x].id == this.userInfo.memberType) {
          this.userInfo.memberTypeCardName = this.addType[x].name
        }
      }
    }

    this.userInfo.globalRoaming = '+' + this.userInfo.globalRoaming;

    console.log(this.userInfo);

    this.birth();

    this.httpService.post(AppConfig.API.editCustomer, this.userInfo).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.return()
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
    let self = this;
    this.httpService.addsheng(function (res) {
      if (res.code === 100000) {
        self.addProvince = res.data;
      }
    })
  }


  // 添加城市
  change(id) {
    if (this.addProvince){
      let self = this;
      this.httpService.addshi(id, function (res) {
        if (res.code === 100000) {
          self.addCity = res.data;
        }
      })
    }
  }


  birthday() {
    this.monthList=[];
    for (let i = 1; i < 13; i++) {
      var list = { "name": i, "value": i };
      this.monthList.push(list);
    }
    console.log(this.monthList);
  }

  bChange(event) {
    this.dayList = []
    var day = 0;
    switch (event) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        day = 31;
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

    for (let i = 1; i <= day; i++) {
      let list = { "name": i, "value": i }
      this.dayList.push(list)
    }

    console.log(event, this.dayList)
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

  // 点击添加
  submit() {
    this.addCustomer();
  }


  ionChoose() {
    this.navCtrl.push(ChoosePage);
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
      for (let i = 0; i < industry.length; i++) {

        var a
        if (type == "爱好") {
          a = self.joi.indexOf(industry[i].id) >= 0;
        }
        if (type == "行业") {
          a = self.joi2.indexOf(industry[i].id) >= 0;
        }
        if (type == "酒类偏好") {
          a = self.joi3.indexOf(industry[i].id) >= 0;
        }
        if (type == "主要购酒目的") {
          a = self.joi4.indexOf(industry[i].id) >= 0;
        }
        if (type == "客户标签") {
          a = self.joi5.indexOf(industry[i].id) >= 0;
        }
        if (type == "日常购酒渠道") {
          a = self.joi6.indexOf(industry[i].id) >= 0;
        }

        alert.addInput({
          type: 'checkbox',
          label: industry[i].tagName,
          value: industry[i],
          checked: a
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: data => {
          console.log('Checkbox data:', data);
          if (type == "爱好") {
            self.join = data;
            self.joi=[];
            for (let g = 0; g < self.join.length; g++) {            
              self.joi.push(self.join[g].id)
            }
          }
          if (type == "行业") {
            self.join2 = data;
            self.joi2=[];
            for (let g = 0; g < self.join2.length; g++) {
              self.joi2.push(self.join2[g].id)
            }
          }
          if (type == "酒类偏好") {
            self.join3 = data;
            self.joi3=[];
            for (let g = 0; g < self.join3.length; g++) {
              self.joi3.push(self.join3[g].id)
            }
          }
          if (type == "主要购酒目的") {
            self.join4 = data;
            self.joi4=[];
            for (let g = 0; g < self.join4.length; g++) {
              self.joi4.push(self.join4[g].id)
            }
          }
          if (type == "客户标签") {
            self.join5 = data;
            self.joi5=[];
            for (let g = 0; g < self.join5.length; g++) {
              self.joi5.push(self.join5[g].id)
            }
          }
          if (type == "日常购酒渠道") {
            self.join6 = data;
            self.joi6=[];
            for (let g = 0; g < self.join6.length; g++) {
              self.joi6.push(self.join6[g].id)
            }
            console.log(self.join6)
          }

         
        }
      });
      alert.present();
    }

  }

}
