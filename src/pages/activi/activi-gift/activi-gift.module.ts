import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviGiftPage } from './activi-gift';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActiviGiftPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviGiftPage),
    MyNavComponentModule
  ],
})
export class ActiviGiftPageModule {}
