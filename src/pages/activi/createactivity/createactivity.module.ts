import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateactivityPage } from './createactivity';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    CreateactivityPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateactivityPage),
    MyNavComponentModule
  ],
})
export class CreateactivityPageModule {}
