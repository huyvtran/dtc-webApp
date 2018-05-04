import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerPage } from './customer';
import { DetailsPage } from './details/details';
import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    CustomerPage
  ],
  imports: [
    IonicPageModule.forChild(CustomerPage),
    MyNavComponentModule
  ],
})
export class CustomerPageModule {}
