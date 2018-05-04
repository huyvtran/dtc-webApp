import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddproductsPage } from './addproducts';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    AddproductsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddproductsPage),
    MyNavComponentModule
  ],
})
export class AddproductsPageModule {}
