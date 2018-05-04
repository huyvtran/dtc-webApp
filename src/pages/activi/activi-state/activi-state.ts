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
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the ActiviStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activi-state',
  templateUrl: 'activi-state.html',
})
export class ActiviStatePage {

  title = '添加新发票';
  showUserImg = false;
  showMenu=true;
  imageURI: any;
  imageFileName: any;
  gender: string = "gonsifapiao";
  abc: any;
  avatar: string = "";
  list = [];
  id;
  presentToast: any;
  value = 1;
  constructor(
    private transfer: FileTransfer,
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
    public camera: Camera,
    private crop: Crop) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '添加新发票';
    this.showMenu = true;
  }
  userInfo = {
    memberId: this.navParams.get("id"),
    type: 1,
    companyName: '',
    phone: '',
    address: '',
    taxNumber: '',
    bankName: '',
    bankAccount: '',
    businessLicenseUrl: '',
    status: 1,
    urlList: [],
    isDefault: 1
  }


  hide() {
    this.userInfo.type = 1
  }
  hides() {
    this.userInfo.type = 2
  }



  button() {
    if (this.abc) {
      this.userInfo.isDefault = 1
    } else {
      this.userInfo.isDefault = 2
    }
  }


  return() {
    this.navCtrl.pop();
  }


  // 确认
  confirmGoods() {
    this.showConfirmCtrl("发票信息未填写完整，仅可提供增值税普通发票。确定是否保存该发票信息?");
  }

  // 询问弹框
  showConfirmCtrl(mssage) {
    let self = this;
    this.httpService.alert(mssage, function () {
      self.submits();
    })
  }




  addInvoice() {
    if (!this.userInfo.companyName && this.userInfo.type == 1) {
      this.httpService.showToast('请填写公司名称');
      return;
    }
    if (!this.userInfo.taxNumber && this.userInfo.type == 1) {
      this.httpService.showToast('请填写税号');
      return;
    }

    if (!this.userInfo.companyName && this.userInfo.type == 2) {
      this.httpService.showToast('请填写发票抬头');
      return;
    }
    if (this.value == 1 && this.userInfo.phone) {
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInfo.phone))) {
        this.httpService.showToast('请填写正确手机号');
        return;
      }
    }

    if (this.value == 2 && this.userInfo.phone) {
      if ((!(/^\d{3,4}-\d{7,8}$|^\d{7,8}$/g.test(this.userInfo.phone)))) {
        this.httpService.showToast('请填写正确固定电话');
        return;
      }
    }

    if (this.userInfo.phone) {
      if (!this.userInfo.bankAccount || !this.userInfo.bankName) {
        this.confirmGoods();
        return;
      }
    }
    if (this.userInfo.bankAccount) {
      if (!this.userInfo.phone || !this.userInfo.bankName) {
        this.confirmGoods();
        return;
      }
    }

    if (this.userInfo.bankName) {
      if (!this.userInfo.bankAccount || !this.userInfo.phone) {
        this.confirmGoods();
        return;
      }
    }
    this.submits();
  }


  submits() {
    this.button();
    this.httpService.post(AppConfig.API.addInvoice, this.userInfo).subscribe(res => {
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

  delete(item) {
    console.log(item);
    for (let i = 0; i < this.userInfo.urlList.length; i++) {
      var index = this.userInfo.urlList.indexOf(item);
      if (index >= 0) {
        this.userInfo.urlList.splice(index, 1)
      }
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


  // 之前
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

    let self = this;
    this.camera.getPicture(options).then(image => {
      this.crop.crop(image, { quality: 75 })
        .then(function (newImage) {
          self.getImg(newImage);
        }, function (error) {
          console.error('Error cropping image', error)
        });
      // this.getImg(image);
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
    let self = this;
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        this.crop.crop(images[0], { quality: 75 })
          .then(function (newImage) {
            self.getImg(newImage);
          }, function (error) {
            console.error('Error cropping image', error)
          });
      }
      // this.getImg(images[0]);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  presentAlert() {
    this.httpService.showToast('只能选择一张图像');
  }

  getImg(imageURI) {
    // this.userInfo.urlList = [];
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
          this.userInfo.urlList.push(result.data);
          var info = {
            headImg: this.userInfo.urlList,
            id: this.id
          };
          this.changeImage(info);

          //  this.userInfo.urlList.push(result.data);    
        } else {
          // alert(result.msg);
        }
      }, (err) => {
        // error
        // alert(JSON.stringify(err));
      })
  }


  changeImage(data) {
    console.log(data);
    this.httpService.post(AppConfig.API.changeImage, data).subscribe(res => {
      let code = res.code
      if (code === 100000) {
        this.httpService.showToast('上传成功', '');
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
    });

  }


}
