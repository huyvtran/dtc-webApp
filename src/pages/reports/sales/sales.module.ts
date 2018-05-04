import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPage } from './sales';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    SalesPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesPage),
    MyNavComponentModule
  ],
})
export class SalesPageModule {}
