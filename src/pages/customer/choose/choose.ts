import { ManualAddPage } from './../manual-add/manual-add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { SetupPage } from '../../setups/setup/setup';
import { MessagePage } from './../../messages/message/message';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
})
export class ChoosePage {
  title = '添加标签';
  ids = [];
  id:any;
  show=true;
  num: any;
  custom = [];
  fixed = [];
  list=[];
  tagIds=[];
  tagId = [];
  initIds=[];
  allList=[];
  memberFrontQueries=[];
  resolve:any;
  newChoose:any;
  showUserImg = false;
  showMenu = true;
  //加载图片
  Biaoqian_img = AppConfig.biaoQian2_img;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private httpService: HttpServiceProvider,
    private storage: Storage,) {
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter (){
    this.title = '添加标签';
    this.showMenu = true;
    this.id = this.navParams.get("id");
    this.getChoose();  
  }

getChoose(){
  this.resolve = this.navParams.get("resolve");
  var userList = this.navParams.get('userList');

  this.httpService.get(AppConfig.API.screenList).subscribe(res => {
    console.log(res)
    let code = res.code
    if (code === 100000) {
      this.custom = res.data.custom;
      this.fixed = res.data.fixed;

      for(let z=0;z<this.custom.length;z++){
        for (let l = 0; l < this.custom[z].tagList.length; l++) {
          this.tagIds.push(this.custom[z].tagList[l].id);
          this.allList.push(this.custom[z].tagList[l])
        }

      }
      for (let k = 0; k < this.fixed.length; k++) {
        for (let l = 0; l < this.fixed[k].tagList.length;l++){
          this.tagIds.push(this.fixed[k].tagList[l].id);
          this.allList.push(this.fixed[k].tagList[l])
        }
        
      }

      this.initIds=this.tagIds;
      if (userList.length>0){
        for (let i = 0; i < userList.length; i++) {
          this.tagId.push(userList[i].tagId);
          for (let k = 0; k < this.initIds.length; k++) {
            if (this.initIds[k] == userList[i].tagId) {
              this.list.push(userList[i]);
            }
          }
        }
      }

    } else {
      this.httpService.showToast(res.msg, '');
    }
  }, error => {
    this.httpService.dismissLoading();
    this.httpService.showToast('请检查参数或路径是否正确');
  });
}


// 创建标签
  addLabel() {
    if (this.newChoose) {
      if (this.id){
          var tab = { id: this.id }
          this.memberFrontQueries.push(tab);
      }    
      let data = {
        tagName: this.newChoose,
        memberFrontQueries: this.memberFrontQueries
      }
      this.httpService.post(AppConfig.API.addLabel, data).subscribe(res => {
        console.log(res)
        let code = res.code
        if (code === 100000) {
          this.list = res.data;
        } else {
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('请检查参数或路径是否正确');
      });
    }
  }


save(){

  this.addLabel();

  var lists=[];
  console.log(this.allList);
  for(let y=0;y<this.allList.length;y++){
    for(let v=0;v<this.tagId.length;v++){
       if(this.allList[y].id==this.tagId[v]){
           lists.push(this.allList[y])
       }
    }
  }

  console.log(lists);
  this.resolve(lists).then((result) => {});
  this.navCtrl.pop();
} 


  submit(id,type) {
    var index = this.tagId.indexOf(id);
    this.num = index >= 0 ? false : true;
    if (index >= 0) {
      this.tagId.splice(index, 1);
    } else {
      this.tagId.push(id);
    }
  }


  button(id) {
    if (this.tagId.length > 0) {
      var index = this.tagId.indexOf(id);
      this.num = index >= 0 ? false : true;
      return this.num;
    } else {
      return true;
    }

  }

  buttons(id) {
    if (this.tagId.length > 0) {
      var index = this.tagId.indexOf(id);
      this.num = index >= 0 ? true : false;
      return this.num;
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


}
