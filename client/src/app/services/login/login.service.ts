import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../models/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getLogin(login: Login){
    return this.http.post(`${this.API_URI}/login`, login);
  }
}
