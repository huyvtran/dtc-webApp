import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialdetailsPage } from './materialdetails';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    MaterialdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialdetailsPage),
    MyNavComponentModule
  ],
})
export class MaterialdetailsPageModule {}
