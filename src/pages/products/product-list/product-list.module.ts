import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
    MyNavComponentModule
  ],
})
export class ProductListPageModule {}
