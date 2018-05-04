import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneverifyPage } from './phoneverify';

@NgModule({
  declarations: [
    PhoneverifyPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneverifyPage),
  ],
})
export class PhoneverifyPageModule {}
