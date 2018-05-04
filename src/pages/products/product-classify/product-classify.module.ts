import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductClassifyPage } from './product-classify';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ProductClassifyPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductClassifyPage),
    MyNavComponentModule
  ],
})
export class ProductClassifyPageModule {}
