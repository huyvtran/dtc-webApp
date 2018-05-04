import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewaddPage } from './newadd';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    NewaddPage,
  ],
  imports: [
    IonicPageModule.forChild(NewaddPage),
    MyNavComponentModule
  ],
})
export class NewaddPageModule {}
