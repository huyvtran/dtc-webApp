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
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  showUserImg = false;
  showMenu = true;
  title = '收据';
  urlList = [];
  constructor(private transfer: FileTransfer,
    // private file: File,
    public loadingCtrl: LoadingController,
    private httpService: HttpServiceProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public camera: Camera) {
  }

  ionViewWillLeave() {
    this.showMenu=false;
    this.title = ' ';
  }
  ionViewWillEnter (){
    this.showMenu=true;
    this.title = '收据';
  }


  // getCode() {
  //   let data = {
  //     "companyId": 85,  //companyId
  //     "memberId": this.navParams.get('id'),    //会员id
  //     "orderNo": this.navParams.get('code'), //提交订单返回的订单号
  //     "outOrderNo": "",  //传我空字符串
  //     "payOrderItems": [
  //       {
  //         "amount": this.navParams.get('money'),  //支付金额
  //         "extendInfo": {}, //2为被扫  app端统一为2
  //         "paymentType":"cash",
  //         "className": "", //空字符串
  //         "deviceEn": "",  //空字符串
  //         "packageName": "", //空字符串
  //         "paymentTypeId": 1
  //       }
  //     ],
  //     "storeId": 99999,  //门店id
  //     "totalAmount": this.navParams.get('money'), //支付金额
  //     "type": 1,        //1消费
  //     "version": 3       //1为publicStore 2为privateStore 3为app端下单  4为活动单下单
  //   }
  //   console.log(data);
  //   this.httpService.post(AppConfig.API.payment, data).subscribe(res => {
  //     console.log(res)
  //     let code = res.code
  //     if (code === 100000) {
          
  //     } else {
  //       this.httpService.showToast(res.msg, '');
  //     }
  
  //   }, error => {
  //     this.httpService.dismissLoading();
  //     this.httpService.showToast('请检查参数或路径是否正确');
  //   });
  // }


  submitImg(){
    let data={
      orderId: this.navParams.get('id'),
      urlList:this.urlList
    }
    this.httpService.post(AppConfig.API.submitImg, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {

      } else {
        this.httpService.showToast(res.msg, '');
      }

    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
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


  delete(item) {
    console.log(item);
    for (let i = 0; i < this.urlList.length; i++) {
      var index = this.urlList.indexOf(item);
      if (index >= 0) {
        this.urlList.splice(index, 1)
      }
    }
  }

  // 拍照
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }


  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      this.getImg(image);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 100,
      height: 100
    };
    this.imagePicker.getPictures(options).then(images => {
      this.getImg(images[0]);
    }, error => {
      console.log('Error: ' + error);
    });
  }


  getImg(imageURI) {
    // this.urlList = [];
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
    }

    fileTransfer.upload(imageURI, AppConfig.gateway + AppConfig.API.updataImg, options)
      .then((data) => {
        // success
        var result = JSON.parse(data.response);
        console.log(result.code);
        let code = result.code;
        if (code == 100000) {
          this.urlList.push(result.data);
        } else {
          // alert(result.msg);
        }
      }, (err) => {
        // error
        // alert(JSON.stringify(err));
      })
  }



}
