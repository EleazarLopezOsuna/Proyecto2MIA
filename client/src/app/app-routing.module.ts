import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component'
import { DesconocidosComponent } from './desconocidos/desconocidos/desconocidos.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SingupLayoutComponent } from './layouts/singup-layout/singup-layout.component';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './main/main.component';
import { SingupComponent } from './singup/singup/singup.component';

const routes: Routes = [
  //App Routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(module => module.MainModule)
      },
      {
        path: '',
        redirectTo: '/usuarios',
        pathMatch: 'full'
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./desconocidos/desconocidos.module').then(module => module.DesconocidosModule)
      }
    ]
  },
  //Login Routes
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
      }
    ]
  },
  //Singup Routes
  {
    path: '',
    component: SingupLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/singup',
        pathMatch: 'full'
      },
      {
        path: 'singup',
        loadChildren: () => import('./singup/singup.module').then(module => module.SingupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
