import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelUpdatePage } from './label-update';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    LabelUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(LabelUpdatePage),
    MyNavComponentModule
  ],
})
export class LabelUpdatePageModule {}
