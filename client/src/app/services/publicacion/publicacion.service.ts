import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion';
import { solicitudUsuarios } from 'src/app/models/solicitudUsuario';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPublicaciones(solicitud: solicitudUsuarios){
    return this.http.post(`${this.API_URI}/publicaciones/all`, solicitud)
  }

  newPublicacion(publicacion: Publicacion){
    return this.http.post(`${this.API_URI}/publicaciones/newPublicacion`, publicacion)
  }
}