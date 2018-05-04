import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from './../../../app/main';
/**
 * Generated class for the MailistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mailist',
  templateUrl: 'mailist.html',
})
export class MailistPage {

  saleslist = [];
  avatar_img = AppConfig.head;
  Sales = "";
  saleId;
  resolve: any;
  showUserImg = false;
  showMenu=true;
  title='现场销售';
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider,) {
  }

  ionViewWillLeave() {
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.showMenu = true;
    this.resolve = this.navParams.get("resolve");
    this.saleId = this.navParams.get("saleId");
    this.judgePage();
  }
  judgePage() {
    if(this.navParams.get("trainer")){
      this.title=this.navParams.get("trainer");
      this.getSalesList('Trainer');
    }else {
      this.getSalesList('DTC Sales');
    }
  }
  getSalesList(role){
    this.httpService.get(AppConfig.API.role+role).subscribe(res => {
      if(res.code == 100000){
        this.saleslist = res.data;
        
        // 选中销售回现
        for(let i = 0; i<this.saleslist.length; i++){
             if(this.saleslist[i].id == this.saleId){
              this.saleslist[i].check = true;
              this.Sales = this.saleslist[i]
             }else{
              this.saleslist[i].check = false;
             }
        }

        console.log(this.saleslist);
      }else{

      } 
    })
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

  // 选择销售
  selectSales(item){
     this.Sales = item;
  }

  // 取消返回
  back(){
    
    this.navCtrl.pop();
  }

  // 确定
  makeSure(){
    if(this.Sales){
      this.resolve(this.Sales).then((result) => { });
      this.navCtrl.pop();
    }else{
      if(this.navParams.get("trainer")){
        this.httpService.showToast("请选择培训师");
      }else {
        this.httpService.showToast("请选择销售");
      }
       
    }
    
  }


}
