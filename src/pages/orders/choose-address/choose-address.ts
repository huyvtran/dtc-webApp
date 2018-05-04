import { NewaddPage } from './../../customer/newadd/newadd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { UpdatePage } from '../../customer/update/update';


/**
 * Generated class for the ChooseAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-address',
  templateUrl: 'choose-address.html',
})
export class ChooseAddressPage {
  title = '收货信息';
  list = [];
  lists = [];
  ids: any;
  showUserImg = false;
  showMenu = true;
  isHide = false;
  show;
  d = true;
  resolveAdd:any;
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navParams: NavParams,) {
  }

  ionViewWillLeave() {
    this.title = '';
    this.showMenu = false;
  }

  ionViewWillEnter() {
    this.showMenu = true;
    this.resolveAdd = this.navParams.get("resolveAdd");
    this.title = '收货信息';
    this.storage.get('userinfo').then((val) => {
      if (val) {
        if (val.role.name != "DTC Head" && val.role.name != "DTC Sales" && val.role.name != "Marketing Head" && val.role.name != "Marketing"
          && val.role.name != "Marketing & HR" && val.role.name != "Training Team Head" && val.role.name != "Trainer") {
          this.d = false;
        }
      } else {

      }
    });
    this.getDetails()
  }


  getDetails() {
    let id = this.navParams.get("id");
    console.log(id)
    this.httpService.get(AppConfig.API.deliveryMessage + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.list = res.data;


      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  setup(id) {
    let data = {
      id: id,
      memberId: this.navParams.get("id")
    }
    this.httpService.post(AppConfig.API.default, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.getDetails();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }



  delete(id) {
    this.httpService.get(AppConfig.API.deleteMessage + id).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.getDetails();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  pushList(item) {
    this.lists = [];
    if (item) {
      this.lists.push(item);
    }
    console.log(this.lists)
  }

  ionNewAdd() {
    this.navCtrl.push(NewaddPage,{
        'id': this.navParams.get("id")
    })
  }

  update(id) {
    this.navCtrl.push(UpdatePage, {
      'id': id
    })
  }

  pop(){
    this.resolveAdd(this.lists).then((result) => { });
    this.navCtrl.pop()
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
