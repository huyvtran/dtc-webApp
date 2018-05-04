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
/**
 * Generated class for the NewaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newadd',
  templateUrl: 'newadd.html',
})
export class NewaddPage {
  title = '添加地址';
  addProvince = [];
  addCity = [];
  addArea = [];
  abc: any;
  newId: any;
  showUserImg = false;
  showMenu = true;
  userP = {
    province: ''
  };

  userN = {
    city: ''
  }

  userQ = {
    district: ''
  }

  userInfo = {
    memberId: '',
    name: '',
    phone: '',
    address: '',
    province: '',
    provinceName: '',
    city: '',
    cityName: '',
    district: '',
    districtName: '',
    zipCode: '',
    isDefault: 2
  }

  //加载图片
  Zhixiang_img = AppConfig.zhiXiang_img;

  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController ) {
  }
  ionViewWillLeave (){
    this.title = ' ';
    this.showMenu = false;
  }

  ionViewWillEnter () {
    this.title = '添加地址';
    this.showMenu = true;
    this.addsheng();
    this.userInfo.memberId = this.navParams.get("id");
    console.log(this.userInfo.memberId)
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
  
  save() {
    if (!this.userInfo.name) {
      this.httpService.showToast('地址信息未填写完整');
      return;
    }  if (!this.userInfo.phone) {
      this.httpService.showToast('地址信息未填写完整');
      return;
    } if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInfo.phone))) {
      this.httpService.showToast('请填写正确手机号');
      return;
    } if (!this.userP.province) {
      this.httpService.showToast('地址信息未填写完整');
      return;
    } if (!this.userN.city) {
      this.httpService.showToast('地址信息未填写完整');
      return;
    } if (!this.userQ.district) {
      this.httpService.showToast('地址信息未填写完整');
      return;
    }if (!this.userInfo.address) {
      this.httpService.showToast('地址信息未填写完整');
      return;
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

    if (this.addArea) {
      for (var z = 0; z < this.addArea.length; z++) {
        let pId = this.addArea[z].cityId;
        let pName = this.addArea[z].cityName;
        if (this.userQ.district == pId) {
          this.userInfo.district = pId;
          this.userInfo.districtName = pName;
        }
      }
    }

    this.httpService.post(AppConfig.API.addMessage, this.userInfo).subscribe(res => {
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

  return() {
    this.navCtrl.pop();
  }


  submit() {
    if (this.abc) {
      this.userInfo.isDefault = 1
    } else {
      this.userInfo.isDefault = 2
    }
    console.log(this.abc)
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
  change(id,type) {
    let self = this;
    this.httpService.addshi(id, function (res) {
      if (res.code === 100000) {
        self.addCity = res.data;
      }
    })
  }
  // 添加区县
  changes(id,type) {
    let self = this;
    this.httpService.addshi(id, function (res) {
      if (res.code === 100000) {
        self.addArea = res.data;
      }
    })
  }



}
