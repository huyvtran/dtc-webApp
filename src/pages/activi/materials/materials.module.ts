import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialsPage } from './materials';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    MaterialsPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialsPage),
    MyNavComponentModule
  ],
})
export class MaterialsPageModule {}
