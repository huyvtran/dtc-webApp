import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from './../../../app/main';
/**
 * Generated class for the ApprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approve',
  templateUrl: 'approve.html',
})
export class ApprovePage {

  saleslist = [];
  avatar_img = AppConfig.head;
  approve = "";
  approveId;
  resolve: any;
  showUserImg = false;
  showMenu=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpServiceProvider) {
  }

  title;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovePage');
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.title = '审批人';
    this.showMenu = true;
    this.resolve = this.navParams.get("resolve");
    this.approveId = this.navParams.get("approveId");
    this.getSalesList();
  }

  getSalesList(){
    this.httpService.get(AppConfig.API.role+'DTC Head').subscribe(res => {
      if(res.code == 100000){
        this.saleslist = res.data;
        
        // 选中销售回现
        for(let i = 0; i<this.saleslist.length; i++){
             if(this.saleslist[i].id == this.approveId){
              this.saleslist[i].check = true;
              this.approve = this.saleslist[i]
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
       this.httpService.showToast("请选择审批人");
    }
    
  }

}
