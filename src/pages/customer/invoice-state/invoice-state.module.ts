import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceStatePage } from './invoice-state';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    InvoiceStatePage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceStatePage),
    MyNavComponentModule
  ],
})
export class InvoiceStatePageModule {}
