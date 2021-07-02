import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.API_URI}/usuarios/all`)
  }
}
