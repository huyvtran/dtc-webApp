import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllactivityPage } from './allactivity';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    AllactivityPage,
  ],
  imports: [
    IonicPageModule.forChild(AllactivityPage),
    MyNavComponentModule
  ],
})
export class AllactivityPageModule {}
