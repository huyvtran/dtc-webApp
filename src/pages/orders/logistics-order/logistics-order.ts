import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/main';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { File } from '@ionic-native/file';

/**
 * Generated class for the LogisticsOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logistics-order',
  templateUrl: 'logistics-order.html',
})
export class LogisticsOrderPage {
  company='';
  logistics='';
  title = '退货信息';
  sjx_img = AppConfig.sjx_img;
  showUserImg = false;
  showMenu = true;
  constructor(private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,) {
  }

  ionViewWillLeave() {
    this.title = '';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '退货信息';  
    this.showMenu = true; 
  }

  returnGoods() {
    if (!this.company){
      this.httpService.showToast('请填写物流公司名称');
      return;
    }
    let data = {
      'companyName': this.company,
      'logisticsNumber': this.logistics,
      'id': this.navParams.get('id')
    }
    console.log(data);
    this.httpService.post(AppConfig.API.logistics, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.httpService.showToast('完善退货信息成功');
        this.returns()
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }


  returns() {
    // this.navCtrl.parent.select(1);
    this.navCtrl.popToRoot();
  }

  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }
}
