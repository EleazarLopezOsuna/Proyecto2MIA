import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SingupLayoutComponent } from './layouts/singup-layout/singup-layout.component';

import { UsersService } from './services/usuarios/users.service';
import { LoginService } from './services/login/login.service';
import { UsuariosLayoutComponent } from './layouts/usuarios-layout/usuarios-layout.component';
import { SolicitudLayoutComponent } from './layouts/solicitud-layout/solicitud-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginFormComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    SingupLayoutComponent,
    UsuariosLayoutComponent,
    SolicitudLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsersService,
    LoginService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
