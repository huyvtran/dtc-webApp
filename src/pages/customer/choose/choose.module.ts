import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoosePage } from './choose';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(ChoosePage),
    MyNavComponentModule
  ],
})
export class ChoosePageModule {}
