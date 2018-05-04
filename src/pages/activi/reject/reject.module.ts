import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RejectPage } from './reject';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    RejectPage,
  ],
  imports: [
    IonicPageModule.forChild(RejectPage),
    MyNavComponentModule
  ],
})
export class RejectPageModule {}
