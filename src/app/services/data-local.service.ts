import { Injectable } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = []   // arreglo donde voy a guardar los favoritos.

  constructor(private storage: Storage,
              public toastController: ToastController) {
    this.cargarFavoritos(); // se va a inicializar cuando intentemos cargar la pagina
   }

   async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

guardarNoticia(noticia: Article) {
  const existe = this.noticias.find(noti => noti.title===noticia.title); // devuelve las noticias que coincide

  if(!existe) {
    this.noticias.unshift(noticia); //  me carga la noticia a principio del arreglo, es la primera que va aparecer el unshif
    this.storage.set('favoritos', this.noticias); // guardo en el storage
  }
  this.presentToast('agregado a favoritos ');


}

 async cargarFavoritos(){ // encargado de leer el storage y leeer la informacion
  const favoritos = await this.storage.get('favoritos');

  //console.log('async await',favoritos); se encarga el await de ejecutar hasta que todo termine
  if(favoritos){
   this.noticias = favoritos;
  }
 }

 borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title); // devuelve el arreglo sin elemento actual
    this.storage.set('favoritos', this.noticias); // guardo nuevamente en el storage
    this.presentToast('Borrado de Favoritos ');
  }


}



