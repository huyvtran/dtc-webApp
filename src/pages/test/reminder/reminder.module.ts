import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReminderPage } from './reminder';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReminderPage),
    MyNavComponentModule
  ],
})
export class ReminderPageModule {}
