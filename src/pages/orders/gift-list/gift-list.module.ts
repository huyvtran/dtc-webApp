import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftListPage } from './gift-list';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    GiftListPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftListPage),
    MyNavComponentModule
  ],
})
export class GiftListPageModule {}
