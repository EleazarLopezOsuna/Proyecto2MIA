import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.imprimirCodigo();
  }

  imprimirCodigo(){
    console.log('El codigo es: ', localStorage.getItem('codigo'));
  }

}
