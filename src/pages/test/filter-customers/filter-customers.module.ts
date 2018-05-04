import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterCustomersPage } from './filter-customers';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    FilterCustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterCustomersPage),
    MyNavComponentModule
  ],
})
export class FilterCustomersPageModule {}
