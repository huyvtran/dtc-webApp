import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../../app/main'
import { EmailverifyPage} from '../emailverify/emailverify';
import { SetpassPage} from '../setpass/setpass';
/**
 * Generated class for the PhoneverifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-phoneverify',
  templateUrl: 'phoneverify.html',
})
export class PhoneverifyPage {
  logo_img_path = AppConfig.logo_img;
  name_img_path = AppConfig.username_img;
  code_img_path = AppConfig.code_img;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneverifyPage');
  }

  email(){
    this.navCtrl.push(EmailverifyPage);
  }

  set(){
    this.navCtrl.push(SetpassPage);
  }

  back(){
    this.navCtrl.pop();
  }
}
