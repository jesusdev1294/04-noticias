import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

ngOnInit() {
 this.cargarNoticias();
}

loadData(event) {
  console.log(event);
  this.cargarNoticias(event);
}

cargarNoticias(event?) { // es opcional ? si existe o no el evento
  this.noticiasService.getTopHeadlines()
     .subscribe(resp => {
      console.log('noticias', resp);

      if(resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }  // cancelo el inifite scroll cuando ya no queda mas noticias

    //  this.noticias=resp.articles; //  extrayendo los aticulos
      this.noticias.push(...resp.articles); // extraigo e inserto o cargo de manera independiente los articulos
     
      if(event) {
       event.target.complete(); // cancelo el infitine scroll el loading data
    }

    });
}

}
