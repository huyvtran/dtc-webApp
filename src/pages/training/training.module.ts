import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingPage } from './training';

import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    TrainingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingPage),
    MyNavComponentModule
  ],
})
export class TrainingPageModule {}
