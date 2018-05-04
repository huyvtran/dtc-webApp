import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseInvoicePage } from './choose-invoice';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ChooseInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseInvoicePage),
    MyNavComponentModule
  ],
})
export class ChooseInvoicePageModule {}
