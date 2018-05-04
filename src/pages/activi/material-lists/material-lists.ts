import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

/**
 * Generated class for the MaterialListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material-lists',
  templateUrl: 'material-lists.html',
})
export class MaterialListsPage {
  dataList = [];   // 最终展示的列表
  list = [];   // 
  type;
  isEdit = false;
  chooseIndex = 0;
  number = 9;
  resolve: any;
  warehouse;  // 仓库
  isBtnShow=false;
  loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({ content:"loading...",dismissOnPageChange:true, showBackdrop:true });
    this.loading.present();
    this.dataList = this.navParams.get("list");
    if(this.dataList.length>0){
      this.loading.dismiss();
    }
  }

}
