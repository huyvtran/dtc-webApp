import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainerPage } from './trainer';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    TrainerPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainerPage),
    MyNavComponentModule
  ],
})
export class TrainerPageModule {}
