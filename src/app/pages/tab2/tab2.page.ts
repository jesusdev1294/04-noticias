import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment; // para dejar opcion por defecto


  categorias = ['bussines', 'entertaiment', 'general', 'health', 'science', 'sports', 'tecnhology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService){
  }

    ngOnInit() {
      this.segment.value = this.categorias[0]; // me toma automatico la primera posicion por defecto
      this.cargarNoticias(this.categorias[0]);
    }

    cambioCategoria(event){
        console.log(event.detail.value);
        this.noticias =[];
        this.cargarNoticias(event.detail.value);

    }

    cargarNoticias(categoria: string, event?){

      this.noticiasService.getTopHeadLinesCategoria(categoria)
        .subscribe(resp => {
          console.log(resp);
          this.noticias.push(...resp.articles); // los 3 puntos significan insertar los articulos inependente en el arreglo
          if(event){
            event.target.complete();
          }
        });

    }

    loadData (event) {

      this.cargarNoticias(this.segment.value, event);
    }

}
