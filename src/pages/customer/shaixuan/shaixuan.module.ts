import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShaixuanPage } from './shaixuan';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ShaixuanPage,
  ],
  imports: [
    IonicPageModule.forChild(ShaixuanPage),
    MyNavComponentModule
  ],
})
export class ShaixuanPageModule {}
