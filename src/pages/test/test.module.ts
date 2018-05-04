import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestPage } from './test';

import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
    MyNavComponentModule
  ],
})
export class TestPageModule {}
