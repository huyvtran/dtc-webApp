import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyNavComponent } from './my-nav';

@NgModule({
  declarations: [
    MyNavComponent,
   ],
  imports: [
    IonicModule,
  ],
  exports: [
    MyNavComponent,
  ],
  entryComponents:[
    MyNavComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyNavComponentModule {}
