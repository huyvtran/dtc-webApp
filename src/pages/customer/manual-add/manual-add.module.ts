import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManualAddPage } from './manual-add';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ManualAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ManualAddPage),
    MyNavComponentModule
  ],
})
export class ManualAddPageModule {}
