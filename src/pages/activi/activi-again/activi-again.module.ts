import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviAgainPage } from './activi-again';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActiviAgainPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviAgainPage),
    MyNavComponentModule
  ],
})
export class ActiviAgainPageModule {}
