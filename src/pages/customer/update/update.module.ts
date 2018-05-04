import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePage } from './update';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    UpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePage),
    MyNavComponentModule
  ],
})
export class UpdatePageModule {}
