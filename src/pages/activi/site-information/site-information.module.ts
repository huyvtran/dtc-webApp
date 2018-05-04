import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteInformationPage } from './site-information';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    SiteInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(SiteInformationPage),
    MyNavComponentModule
  ],
})
export class SiteInformationPageModule {}
