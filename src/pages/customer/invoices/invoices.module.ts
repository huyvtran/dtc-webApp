import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesPage } from './invoices';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    InvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicesPage),
    MyNavComponentModule
  ],
})
export class InvoicesPageModule {}
