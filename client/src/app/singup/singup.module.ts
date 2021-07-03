import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SingupRoutingModule } from './singup-routing.module';
import { SingupComponent } from './singup/singup.component';


@NgModule({
  declarations: [
    SingupComponent
  ],
  imports: [
    CommonModule,
    SingupRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SingupModule { }
