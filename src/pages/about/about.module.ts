import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    MyNavComponentModule
  ],
})
export class AboutPageModule {}
