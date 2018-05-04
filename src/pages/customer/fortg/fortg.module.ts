import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FortgPage } from './fortg';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    FortgPage,
  ],
  imports: [
    IonicPageModule.forChild(FortgPage),
    MyNavComponentModule
  ],
})
export class FortgPageModule {}
