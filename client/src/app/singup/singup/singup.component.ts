import { Component, OnInit, HostBinding } from '@angular/core';
import { Singup } from 'src/app/models/singup';
import { SingupService } from '../../services/singup/singup.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  singup: Singup = {
    username: '',
    password: '',
    name: ''
  };

  constructor(private singupService: SingupService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  singUp(){
    this.singupService.setNew(this.singup)
    .subscribe(
      res => {
        const respuesta:any = res;
      },
      err => console.error(err)
    )
  }

}
