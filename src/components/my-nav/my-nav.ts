import { Component,Input,Output,EventEmitter } from '@angular/core';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AppConfig } from '../../app/main';
import { Events } from 'ionic-angular';
/**
 * Generated class for the MyNavComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-nav',
  templateUrl: 'my-nav.html'
})
export class MyNavComponent {

 
  @Input() title: string;
  @Input() showMenu: any;
  @Input() type: string;
  @Input() showHead: any;
  @Output() cartClick = new EventEmitter<any>();
  @Output() settingsClick = new EventEmitter<any>();
  @Output() chatbubblesClick = new EventEmitter<any>();

  headImg = '';
  lens:any;
  memberId:any;
  hide=false;
  hi=false;
  constructor(private httpService: HttpServiceProvider, public events: Events) {

    this.getMessage();  
   
  // 监听事件
    events.subscribe('number:shopping', (time) => {
       this.reloadMssage();
    });
 
  //推送
    var onReceiveNotification = (event) => {
        this.jpush();
    }
    document.addEventListener("jpush.receiveNotification",onReceiveNotification, false);
  }


  // 获取角色信息
  getMessage(){
    var self = this;
    this.httpService.getContent(function (res) {
      console.log(res);
      if (res.code === 100000) {
        var data = res.data;
        self.memberId = data.id;
        console.log(self.memberId);
        if (!data.headImg) {
          self.headImg = AppConfig.head
        } else {
          self.headImg = data.headImg
        }         
        self.shoppingNumber();       
      }    
    })
     this.jpush();   
  }


  // 再次调用
  reloadMssage(){
    var self = this;
    this.httpService.getContent(function (res) {
      console.log(res);
      if (res.code === 100000) {
        var data = res.data;
        self.memberId = data.id;
        console.log(self.memberId);
        if (!data.headImg) {
          self.headImg = AppConfig.head
        } else {
          self.headImg = data.headImg
        }    
      }      
    }) 
    this.shoppingNumber();
    this.jpush(); 
  }
  
  //极光推送
  jpush(){
    this.httpService.get(AppConfig.API.getMessagePush).subscribe(res => {
      console.log(res);
      let code = res.code;
      let data = res.data;
      if (code === 100000) {
          if(data == true){
            this.hide = true;
          } else if (data == false){
            this.hide = false;
          }
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    })
  }


//购物车数量
 shoppingNumber(){
   if (this.memberId) {
     let data = {
       "memberId": this.memberId,
       "channel": 3,
     };
     console.log(data);
     this.httpService.posts(AppConfig.API.numberShopping, data).subscribe(res => {
       console.log(res);
       let code = res.code;
       if (code === 100000) {
         if (res.data == 0) {
           this.hi = false;
         } else {
           this.hi = true;
           this.lens = res.data;
         }       
       } else {
         this.httpService.showToast(res.msg, '');
       }
     }, error => {
       this.httpService.dismissLoading();
       this.httpService.showToast('请检查参数或路径是否正确');
     })
   }   
 }

  cart(){
    // output 回调
    this.cartClick.emit();
  }

  settings(){
    this.settingsClick.emit();
  }

  chatbubbles(){
    this.chatbubblesClick.emit();
  }

}

