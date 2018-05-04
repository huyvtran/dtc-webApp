import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsInvoicePage } from './details-invoice';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    DetailsInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsInvoicePage),
    MyNavComponentModule
  ],
})
export class DetailsInvoicePageModule {}
