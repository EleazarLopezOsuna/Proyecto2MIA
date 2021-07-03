import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { solicitudUsuarios } from 'src/app/models/solicitudUsuario';
import { relacion } from '../../models/newRelacion';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(solicitud: solicitudUsuarios){
    return this.http.post(`${this.API_URI}/usuarios/all`, solicitud)
  }

  newRelacion(relation: relacion){
    return this.http.post(`${this.API_URI}/usuarios/newRelacion`, relation)
  }
}
