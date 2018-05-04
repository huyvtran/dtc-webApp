import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController, ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Crop } from '@ionic-native/crop';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the SiteInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-site-information',
  templateUrl: 'site-information.html',
})
export class SiteInformationPage {
  img;
  id;
  read;
  resolve: any;
  showBigImg;
  myImg;
  eventForm={
    "actualNumber":0,
    'actualAveragePrice':0,
    'imgList':[],
    'eventProductList':[
      {
        'productName':'',
        'eventMaterialList':[
          {
            'productId':'',
            'stock':0,
            'saleStock':0,
            'usedStock':0,
            'qcStock':0,
            'damageStock':0,
            'soldStock':0
          }
        ]
        
      }

    ]
  };
  constructor(
    private transfer: FileTransfer,
    // private file: File,
    public loadingCtrl: LoadingController,
    private httpService: HttpServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController, 
    public imagePicker: ImagePicker, 
    public camera: Camera,
    private crop: Crop ,
    private keyboard: Keyboard
  ) {
  }

    //键盘监听
    ionViewDidLoad(){
      this.keyboard.hideKeyboardAccessoryBar(true);
      this.keyboard.disableScroll(true);
  
      // //键盘弹出
      this.keyboard.onKeyboardShow().subscribe((e) => {
        var height = e.keyboardHeight;
          let styles=document.getElementById('productWrap');
          styles.style.marginBottom=height+"px";
      });
      // //键盘收回
      this.keyboard.onKeyboardHide().subscribe((e) => {
          let sty = document.getElementById('productWrap');
          sty.style.marginBottom = 0+'px';
      });
    }
  ionViewWillEnter() {
    this.resolve = this.navParams.get("resolve");
    this.eventForm= this.navParams.get("eventForm");
    this.read= this.navParams.get("read");
    if(this.eventForm.imgList==null){
      this.eventForm.imgList=[];
    }
    this.showBigImg = false;
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
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true,
    };
    this.camera.getPicture(options).then(image => {
      this.getImg(image);
    }, error => {
      console.log('Error: ' + error);
    });
    // let self = this;
    // this.camera.getPicture(options).then(image => {
    //   this.crop.crop(image, { quality: 75 })
    //     .then(function (newImage) {
    //       self.getImg(newImage);
    //     }, function (error) {
    //       console.error('Error cropping image', error)
    //     });
    // }, error => {
    //   console.log('Error: ' + error);
    // });
  }
  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 1000,
      height: 1000
    };
    this.imagePicker.getPictures(options).then(images => {
      this.getImg(images[0]);
    }, error => {
      console.log('Error: ' + error);
    });
    // let self = this;
    // this.imagePicker.getPictures(options).then(images => {
    //   if (images.length > 1) {
    //     this.presentAlert();
    //   } else if (images.length === 1) {
    //     this.crop.crop(images[0], { quality: 75 })
    //       .then(function (newImage) {
    //         self.getImg(newImage);
    //       }, function (error) {
    //         console.error('Error cropping image', error)
    //       });
    //   }    
    //   // this.getImg(images[0]);
    // }, error => {
    //   console.log('Error: ' + error);
    // });
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
      // success
      var result = JSON.parse(data.response);
      let code = result.code;
      if(code == 100000){
        if(this.eventForm.imgList.length<9){
          this.eventForm.imgList.push(result.data);
        }else {
          this.httpService.showToast('上传图片不能超过9张');
        }
      }else{
        // alert(result.msg);
      }
    }, (err) => {
      // error
      // alert(JSON.stringify(err));
    })
  }
  removeImg(index) {
    this.eventForm.imgList.splice(index,1);
  }
  bigImg(img){
    if(this.read){
      this.showBigImg = true;
      this.myImg = img;

    }
  }
  closeImg(){
    this.showBigImg = false;
  }
  // closeImage() {
  //   this.read = true;
  // }
  //提交活动现场信息
  submitInfo() {
    let self = this;
    this.httpService.customAlert("确认提交现场信息","是否确认提交现场信息?", function () {
      if (self.check(self.eventForm)) {
        self.httpService.posts(AppConfig.API.confirmActivity,self.eventForm).subscribe(res => {
          let code = res.code;
          if (code === 100000) {
            self.resolve(self.eventForm).then((result) => { });
            self.navCtrl.pop();
          } else {

            self.httpService.showToast(res.msg, '');
          }
        }, error => {
          self.httpService.dismissLoading();
          self.httpService.showToast('网络异常');
        });
      }
    },function(){
      
    })
  }
    
      //校验
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
        if (this.isEmpty(form.actualNumber)) {
          this.showToast('请填写参与人数');
          return false;
        }
        if (this.isEmpty(form.actualAveragePrice)) {
          this.showToast('请填写实际人均花费');
          return false;
        }
        for(var i = 0; i < form.eventProductList.length;i++) {
          for(var j = 0; j<form.eventProductList[i].eventMaterialList.length;j++){
            var material = form.eventProductList[i].eventMaterialList[j];
            console.log(material)
            if(material.usedStock+material.qcStock+material.damageStock+material.soldStock>material.stock){
              this.showToast(form.eventProductList[i].productName+'产品现场信息有误');
              return false;
            }
          }
        }
        return true;
      }
}
