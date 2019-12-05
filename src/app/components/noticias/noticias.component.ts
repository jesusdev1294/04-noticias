import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
@Input() noticias: Article [] = []; // envio mi variable noticias desde mi modulo principal hacia este modulo
@Input() enFavoritos = false;
constructor() { }

  ngOnInit() {}

}
