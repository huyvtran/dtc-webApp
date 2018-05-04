import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivitydetailsPage } from './activitydetails';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActivitydetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivitydetailsPage),
    MyNavComponentModule
  ],
})
export class ActivitydetailsPageModule {}
