import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteoffPage } from './writeoff';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    WriteoffPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteoffPage),
    MyNavComponentModule
  ],
})
export class WriteoffPageModule {}
