import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { AppConfig } from '../../app/main';
import { MessagePage } from '../messages/message/message';
import { ShoppingCartPage } from '../orders/shopping-cart/shopping-cart';
import { SetupPage } from '../setups/setup/setup';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { File } from '@ionic-native/file';
import { Crop } from '@ionic-native/crop';
/**
 * Generated class for the ChangeAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-change-avatar',
  templateUrl: 'change-avatar.html',
})
export class ChangeAvatarPage {
  title = "更换头像";
  show=true;
  showMenu=true;
  img;
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams,private transfer: FileTransfer, public imagePicker: ImagePicker, 
    public camera: Camera, public actionSheetCtrl: ActionSheetController , private httpService: HttpServiceProvider,private crop: Crop) {

  }

  ionViewWillLeave() {
    this.title = ' ';
    console.log('ionViewDidLoad ChangeAvatarPage');
    this.show=false;
    this.showMenu=false;
  }
  ionViewDidLoad() {
    this.img = this.navParams.get("img");
    this.id = this.navParams.get("id");
    console.log(this.id);
  }
  ionViewWillEnter (){
    this.title = '更换头像'; 
    this.showMenu = true;
    this.show=true;
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
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
    };

    let self = this;
    this.camera.getPicture(options).then(image => {
     this.crop.crop(image, {quality: 75})
     .then(function(newImage) {
       self.getImg(newImage);
     },function(error){
       console.error('Error cropping image', error)
     });

    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 400,
      height: 400
    };

    let self = this;
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        this.crop.crop(images[0], {quality: 75})
        .then(function(newImage) {
          self.getImg(newImage);
        },function(error){
          console.error('Error cropping image', error)
        });
      }     
    }, error => {
      console.log('Error: ' + error);
    });
  }

  presentAlert() {
    this.httpService.showToast('只能选择一张图像');
  }



  getImg(imageURI) {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
    }

    fileTransfer.upload(imageURI, AppConfig.gateway+AppConfig.API.updataImg, options)
    .then((data) => {
   
      var result = JSON.parse(data.response);
      let code = result.code;
      if(code ==100000){
         this.img = result.data;
         var info = {
          headImg:this.img,
          id:this.id
         };
         this.changeImage(info);

      }else{
        //  alert(result.msg);
      }

    }, (err) => {
    
    })

  }

  changeImage(data){
    console.log(data);
    this.httpService.post(AppConfig.API.changeImage, data).subscribe(res => {
      let code = res.code
      if (code ===  100000) {
        this.httpService.showToast('更新成功', '');
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });

  }

}
