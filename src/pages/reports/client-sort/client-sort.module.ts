import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientSortPage } from './client-sort';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ClientSortPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientSortPage),
    MyNavComponentModule
  ],
})
export class ClientSortPageModule {}
