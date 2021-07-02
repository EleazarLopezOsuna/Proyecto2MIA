import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesconocidosRoutingModule } from './desconocidos-routing.module';
import { DesconocidosComponent } from './desconocidos/desconocidos.component';


@NgModule({
  declarations: [
    DesconocidosComponent
  ],
  imports: [
    CommonModule,
    DesconocidosRoutingModule
  ]
})
export class DesconocidosModule { }
