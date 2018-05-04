import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltersPage } from './filters';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    FiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltersPage),
    MyNavComponentModule
  ],
})
export class FiltersPageModule {}
