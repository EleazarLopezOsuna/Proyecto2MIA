import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/usuarios/users.service';
import { solicitudUsuarios } from 'src/app/models/solicitudUsuario';
import { relacion } from 'src/app/models/newRelacion';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  solicitud: solicitudUsuarios = {
    codigo: ''
  }

  relation: relacion = {
    usuario1: '',
    usuario2: ''
  }

  usuarios: any = [];

  constructor(private userService: UsersService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.solicitud.codigo = localStorage.getItem('codigo')!;
    this.userService.getUsers(this.solicitud).subscribe(
      res => {
        this.usuarios = res;
      },
      err => console.error(err)
    );
  }

  agregarUsuario(id: string){
    this.relation.usuario1 = id;
    this.relation.usuario2 = localStorage.getItem('codigo')!;
    console.log(this.relation)
    this.userService.newRelacion(this.relation).subscribe(
      res => {
        window.location.reload();
      },
      err => console.error(err)
    );
  }

}
