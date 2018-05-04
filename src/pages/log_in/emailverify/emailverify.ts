import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../../app/main'
import { SetpassPage} from '../setpass/setpass';
/**
 * Generated class for the EmailverifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-emailverify',
  templateUrl: 'emailverify.html',
})
export class EmailverifyPage {

  logo_img_path = AppConfig.logo_img;
  email_img_path = AppConfig.email_img;
  code_img_path = AppConfig.code_img;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailverifyPage');
  }

  back(){
    this.navCtrl.pop();
  }

  set(){
   this.navCtrl.push(SetpassPage);
  }

}
