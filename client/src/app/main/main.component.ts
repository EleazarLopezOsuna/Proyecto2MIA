import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from '../models/publicacion';
import { solicitudUsuarios } from '../models/solicitudUsuario';
import { PublicacionService } from '../services/publicacion/publicacion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  publicacion: Publicacion = {
    codigo: '',
    contenido: ''
  }

  solicitud: solicitudUsuarios = {
    codigo: ''
  }

  publicaciones: any = [];

  constructor(private publicacionService: PublicacionService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.solicitud.codigo = localStorage.getItem('codigo')!;
    this.publicacionService.getPublicaciones(this.solicitud).subscribe(
      res => {
        this.publicaciones = res;
      },
      err => console.error(err)
    );
  }

  publicar(){
    this.publicacion.codigo = localStorage.getItem('codigo')!;
    this.publicacionService.newPublicacion(this.publicacion)
    .subscribe(
      res => {
        const respuesta:any = res;
        window.location.reload();
      },
      err => console.error(err)
    )
  }
}
