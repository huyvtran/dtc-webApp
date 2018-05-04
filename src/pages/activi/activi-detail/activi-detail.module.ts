import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviDetailPage } from './activi-detail';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActiviDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviDetailPage),
    MyNavComponentModule
  ],
})
export class ActiviDetailPageModule {}
