import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviUpdatePage } from './activi-update';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ActiviUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviUpdatePage),
    MyNavComponentModule
  ],
})
export class ActiviUpdatePageModule {}
