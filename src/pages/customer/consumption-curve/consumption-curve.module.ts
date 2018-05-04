import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumptionCurvePage } from './consumption-curve';

import {MyNavComponentModule} from '../../../components/my-nav/my-nav.module'


@NgModule({
  declarations: [
    ConsumptionCurvePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumptionCurvePage),
    MyNavComponentModule
  ],
})
export class ConsumptionCurvePageModule {}
