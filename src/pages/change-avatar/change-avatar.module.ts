import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeAvatarPage } from './change-avatar';

import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ChangeAvatarPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeAvatarPage),
    MyNavComponentModule
  ],
})
export class ChangeAvatarPageModule {}
