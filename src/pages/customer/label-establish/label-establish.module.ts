import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelEstablishPage } from './label-establish';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    LabelEstablishPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelEstablishPage),
    MyNavComponentModule
  ],
})
export class LabelEstablishPageModule {}
