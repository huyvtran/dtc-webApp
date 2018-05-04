import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MailistPage } from './mailist';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    MailistPage,
  ],
  imports: [
    IonicPageModule.forChild(MailistPage),
    MyNavComponentModule
  ],
})
export class MailistPageModule {}
