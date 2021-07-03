import { Component, OnInit, HostBinding } from '@angular/core';
import { Login } from 'src/app/models/login';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  login: Login = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  logearse(){
    this.loginService.getLogin(this.login)
      .subscribe(
        res => {
          const respuesta:any = res;
          if(respuesta['RESULTADO'] != 0){
            localStorage.setItem('codigo', respuesta['RESULTADO']);
            this.router.navigate(['main']);
          }else{
            window.location.reload();
          }
        },
        err => console.error(err)
      )
  }
}
