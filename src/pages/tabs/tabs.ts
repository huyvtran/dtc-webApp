import { Component } from '@angular/core';

import { OrderPage } from '../orders/order/order';
import { CustomerPage } from '../customer/customer';
import { ProductPage } from '../products/product/product';
import { ActivityPage } from '../activi/activity/activity';
import { ReportPage } from '../reports/report/report';

import { AlertController, Nav,NavController ,App} from 'ionic-angular';
import { JPush } from 'ionic3-jpush';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Device } from '@ionic-native/device';
import { MessagePage } from '../../pages/messages/message/message';

import { Storage } from '@ionic/storage';

@Component({
  selector:'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  orderTabRoot = OrderPage;
  customerTabRoot = CustomerPage;
  productTabRoot = ProductPage;
  activityTabRoot = ActivityPage;
  reportTabRoot = ReportPage;
  constructor( public alertCtrl: AlertController, public jPush: JPush, private httpService: HttpServiceProvider, public device: Device,public navCtrl: NavController,public app: App,private storage: Storage,) {
       this.initPushNotification();
  }

   // 极光推送
   initPushNotification() {
    // 初始化  
    this.jPush.init();

    // 注册(获取deviceToken)
    this.jPush.getRegistrationID().then(regid => {
      console.log("regID===>" + regid);
    })


    this.storage.get('userinfo').then((val) => {
      if(val){
        
        this.setAlias(val.mobile);
      }
   });

   this.jPush.setApplicationIconBadgeNumber(0);

    var self = this;
    // 获取设备系统
    var deviceName = this.device.platform;

    // 获取推送
    var onReceiveNotification = (event) => {
      var alertContent;

      if (deviceName == 'iOS') {
        alertContent = event.aps.alert;
      } else {  // Android
        alertContent = event.alert;
      }

      let alert = this.alertCtrl.create({
        title: "消息",
        message: alertContent,
        buttons: [{
          text: "确定",
          handler: token => {
            this.jPush.setApplicationIconBadgeNumber(0);
            // this.app.getActiveNav() 获取当前页面的nav
           this.app.getActiveNav().push(MessagePage);
          
          },

        }, {
          text: "取消",
        }]
      });
      alert.present();

      self.jPush.setBadge(0);
    }

    document.addEventListener("jpush.receiveNotification",onReceiveNotification, false);


    // 自定义推送
    // var onReceiveMessage = (event) =>{
    //   var message = event.content;
    //   if (deviceName == 'iOS') {
    //     message = event.content;
    //   } else {  // Android
    //     message = event.message;
    //   }

    //   let alert = this.alertCtrl.create({
    //     title: "消息",
    //     message: message,
    //     buttons: [{
    //       text: "确定",
    //       handler: token => {
    //         this.jPush.setApplicationIconBadgeNumber(0);
    //         this.app.getActiveNav().push(MessagePage);
    //       },

    //     }, {
    //       text: "取消",
    //     }]
    //   });
    //   alert.present();

    //   self.jPush.setBadge(0);
    // }

    // document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

    // 点击推送通知
    var onOpenNotification = (event)=>{
        // 清空角标
        this.jPush.setApplicationIconBadgeNumber(0);
    }

    document.addEventListener("jpush.openNotification", onOpenNotification, false)

  }


  setAlias(alias) {

    // this.jPush.deleteAlias({sequence: 1}).then(res =>{
    //   console.log(res);
    // });

    this.jPush.setAlias({ sequence: 1, alias: alias }).then(res => {
      console.log(res);
    })
  }
}
