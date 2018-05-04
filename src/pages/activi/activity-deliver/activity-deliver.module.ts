import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityDeliverPage } from './activity-deliver';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActivityDeliverPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityDeliverPage),
    MyNavComponentModule
  ],
})
export class ActivityDeliverPageModule {}
