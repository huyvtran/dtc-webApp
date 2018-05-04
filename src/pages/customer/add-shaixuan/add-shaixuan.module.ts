import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShaixuanPage } from './add-shaixuan';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    AddShaixuanPage,
  ],
  imports: [
    IonicPageModule.forChild(AddShaixuanPage),
    MyNavComponentModule
  ],
})
export class AddShaixuanPageModule {}
