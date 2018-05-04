import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyPage } from './modify';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyPage),
    MyNavComponentModule
  ],
})
export class ModifyPageModule {}
