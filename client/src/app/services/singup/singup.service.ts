import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Singup } from '../../models/singup';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  setNew(singup: Singup){
    return this.http.post(`${this.API_URI}/singup`, singup);
  }
}
