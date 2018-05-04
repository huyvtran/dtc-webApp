import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';

import {MyNavComponentModule} from '../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    MyNavComponentModule
  ],
})
export class ContactPageModule {}
