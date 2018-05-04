import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController, AlertController, ToastController,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import { AppConfig } from '../../app/main'



@Injectable()
export class HttpServiceProvider {

  gateway = "http://dtc.ocheng.me/api/";
  // gateway = "https://edrington.shop/api/";
  token;
  loading;
  headers;
  options


  constructor(
    public http: Http,
    public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private storage: Storage,
  ) {
     
      this.storage.remove('userinfo');
      this.storage.get('userinfo').then((val) => {
        if(val){
          this.optionSet(val.token);
        }else{
          this.optionSet(val);
        }
     });
  
  }

  optionSet(token){
    this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 'X-Security-token':token});
    
    this.options = new RequestOptions({ headers: this.headers });
  }

  //get请求
  get(url: string): Observable<any> {
    return this.http.get(this.gateway + url, this.options).map(res => res.json());
  }

  //post请求
  post(url: string, body: any): Observable<any> {
    this.loading = this.loadingCtrl.create({ content:"loading...",dismissOnPageChange:true, showBackdrop:true });
    this.loading.present();
    return this.http.post(this.gateway+url, JSON.stringify(body), this.options)
      .map(res => {
       
         this.loading.dismiss();
        return res.json();
      });
  }
  posts(url: string, body: any): Observable<any> {
    // this.loading = this.loadingCtrl.create({ content:"loading...",dismissOnPageChange:true, showBackdrop:true });
    // this.loading.present();
    return this.http.post(this.gateway+url, JSON.stringify(body), this.options)
      .map(res => {
       
        //  this.loading.dismiss();
        return res.json();
      });
  }

  //put请求
  put(url: string, body: any): Observable<any> {
    this.loading = this.loadingCtrl.create({ content: "loading...", dismissOnPageChange: true, showBackdrop: true });
    this.loading.present();
    return this.http.put(this.gateway + url, JSON.stringify(body), this.options)
      .map(res => {
       
        this.loading.dismiss();
        return res.json();
      });
  }

  // 
  dismissLoading(){
    this.loading.dismiss();
  }
   
  // toast
  showToast(message,callback?){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      dismissOnPageChange: true,
      position: 'top'
    });
    toast.present();
    if (callback) {
      callback();
    }

  } 

  // modal
  modalTo(page){
    let modal = this.modalCtrl.create(page);
    modal.present();  
  }


  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: "提示",
        message: message,
        buttons: [{
          text: "确定",
          handler: token => {
            callback();
          },

        }, {
          text: "取消",        
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: "提示",
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }

  customAlert(title,message, callback?,cancel?){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: "确定",
        handler: token => {
          callback();
        },

      }, {
        text: "取消",  
        handler: token => {
          cancel();
        },      
      }]
    });
    alert.present();
  }

  activityAlert(title, message, callback?, cancel?) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: "活动下单",
        handler: token => {
          callback();
        },

      }, {
        text: "非活动下单",
        handler: token => {
          cancel();
        },
      }]
    });
    alert.present();
  }


//获取会员列表
  getMessage(data,calback) {
    this.posts(AppConfig.API.personnelList, data).subscribe(res => {
      
      calback(res)
    })
  }


  //获取会员列表2
  getMessages(data, calback) {
    this.posts(AppConfig.API.chooseCustomers, data).subscribe(res => {
      calback(res)
    })
  }

    // 获取会员信息
  getContent(calback) {
    this.get(AppConfig.API.personnelMessage).subscribe(res => {

      calback(res)
    });
  }

  // 添加省份
  addsheng(calback) {
    this.get(AppConfig.API.addProvince + 1).subscribe(res => {
 
      calback(res)
    });
 }

 //添加城市
  addshi(id,calback) {
    this.get(AppConfig.API.addProvince + id).subscribe(res => {

      calback(res)
    }) 
  }
//加入购物车
 addShopping(data,calback){
   this.post(AppConfig.API.shopping, data).subscribe(res => {
     console.log(res)
     calback(res)
   })
 }


}