import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizerPage } from './organizer';
import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'

@NgModule({
  declarations: [
    OrganizerPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizerPage),
    MyNavComponentModule
  ],
})
export class OrganizerPageModule {}
