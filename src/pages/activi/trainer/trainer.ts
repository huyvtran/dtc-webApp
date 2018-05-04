import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from './../../../app/main';
/**
 * Generated class for the TrainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trainer',
  templateUrl: 'trainer.html',
})
export class TrainerPage {
  title='';
  saleslist = [];
  avatar_img = AppConfig.head;
  approve = "";
  secondApproverId;
  resolve: any;
  showUserImg = false;
  showMenu=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainerPage');
  }
  ionViewWillLeave (){
    this.showMenu=false;
    this.title = ' ';
  }
  ionViewWillEnter() {
    this.title = '培训师指派人';
    this.showMenu = true;
    this.resolve = this.navParams.get("resolve");
    this.secondApproverId = this.navParams.get("secondApproverId");
    this.getSalesList();
  }

  getSalesList(){
    this.httpService.get(AppConfig.API.role+'Training Team Head').subscribe(res => {
      if(res.code == 100000){
        this.saleslist = res.data;
        // 选中销售回现
        for(let i = 0; i<this.saleslist.length; i++){
             if(this.saleslist[i].id == this.secondApproverId){
              this.saleslist[i].check = true;
              this.approve = this.saleslist[i];
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
     this.approve = item;
  }

  // 取消返回
  back(){
    
    this.navCtrl.pop();
  }

  // 确定
  makeSure(){
    if(this.approve){
      this.resolve(this.approve).then((result) => { });
      this.navCtrl.pop();
    }else{
       this.httpService.showToast("请选择培训师指派人");
    }
    
  }

}
