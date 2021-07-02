import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesconocidosComponent } from './desconocidos/desconocidos.component';

const routes: Routes = [
  {
    path: '',
    component: DesconocidosComponent,
    children: [
      {
        path: 'usuarios',
        component: DesconocidosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesconocidosRoutingModule { }
