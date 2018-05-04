import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivitycodePage } from './activitycode';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActivitycodePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivitycodePage),
    MyNavComponentModule
  ],
})
export class ActivitycodePageModule {}
