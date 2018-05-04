import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogisticsPage } from './logistics';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    LogisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(LogisticsPage),
    MyNavComponentModule
  ],
})
export class LogisticsPageModule {}
