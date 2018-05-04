import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyPasswordPage } from './modify-password';

import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    ModifyPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyPasswordPage),
    MyNavComponentModule
  ],
})
export class ModifyPasswordPageModule {}
