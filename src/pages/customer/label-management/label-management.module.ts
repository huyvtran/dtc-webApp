import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelManagementPage } from './label-management';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    LabelManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelManagementPage),
    MyNavComponentModule
  ],
})
export class LabelManagementPageModule {}
