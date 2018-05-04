import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';

/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  listCustomer = [];
  listId:any;
  avatar_img = AppConfig.head;
  breeds = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
  
    title = '活动客户';
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }
  ionViewWillEnter(){

    this.getList();
  }
  // 获取会员列表
  getList(){
    let eventId =this.navParams.get("eventId");   
    let data={'eventId':eventId}
    this.getMessage(data)
  }
  //获取会员列表
  getMessage(data){
    let self = this;
    this.httpService.getMessage(data, function (res) {
      if (res.code === 100000) {
        self.listCustomer = res.data;
      }
    })
  }

   // 检索点击
   indexClick(item){
    
          for(let index in this.listCustomer){
           if(this.listCustomer[index].key == item && this.listCustomer[index].list.length >0){
             // 找到点击的字母并且检索下存在人员 页面发生偏移
             this.startScroll(index);
           }   
          }
        }
    
      startScroll(index){
        var offsetY = 0;
        for(let i = 0; i<index; i++){
          if(this.listCustomer[i].list.length > 0){
            offsetY += this.listCustomer[i].list.length * 7 + 3;
          }  
        }  
    
        // let element = document.getElementById("scrollBox");
        //  element.scrollTo(0, offsetY*12);  // 兼容问题
    
        document.querySelector('#scrollBox').scrollTop = offsetY*10;
      
      }


  // goDetails(item){
  //   this.listId = item.id
  //   console.log(this.listId);
  //   //跳转页面  
  //   this.navCtrl.push(DetailsPage, { "id": this.listId });
  // }

}
