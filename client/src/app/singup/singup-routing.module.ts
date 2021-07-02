import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {
    path: '',
    component: SingupComponent,
    children: [
      {
        path: 'singup',
        component: SingupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingupRoutingModule { }
