import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviInvoicePage } from './activi-invoice';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ActiviInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviInvoicePage),
    MyNavComponentModule
  ],
})
export class ActiviInvoicePageModule {}
