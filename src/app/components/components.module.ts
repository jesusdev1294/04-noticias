import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent
  ],
  exports: [
    NoticiasComponent
  ], // no se exporta el noticia porque depende del de noticias
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
