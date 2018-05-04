import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewwriteoffPage } from './viewwriteoff';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ViewwriteoffPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewwriteoffPage),
    MyNavComponentModule
  ],
})
export class ViewwriteoffPageModule {}
