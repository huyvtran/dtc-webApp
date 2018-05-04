import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialListsPage } from './material-lists';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    MaterialListsPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialListsPage),
    MyNavComponentModule
  ],
})
export class MaterialListsPageModule {}
