import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertMessageComponent } from "./alert-message.component";

@NgModule({
  declarations: [
      AlertMessageComponent
  ],
  imports: [
    CommonModule
    ],
   exports:[
       AlertMessageComponent
   ]

})
export class alertmessageModule { }
