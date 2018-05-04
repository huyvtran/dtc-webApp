import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovePage } from './approve';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ApprovePage,
  ],
  imports: [
    IonicPageModule.forChild(ApprovePage),
    MyNavComponentModule
  ],
})
export class ApprovePageModule {}
