import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviStatePage } from './activi-state';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActiviStatePage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviStatePage),
    MyNavComponentModule
  ],
})
export class ActiviStatePageModule {}
