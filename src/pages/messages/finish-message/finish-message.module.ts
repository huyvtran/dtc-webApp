import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinishMessagePage } from './finish-message';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    FinishMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(FinishMessagePage),
    MyNavComponentModule
  ],
})
export class FinishMessagePageModule {}
