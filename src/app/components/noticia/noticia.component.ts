import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
@Input() noticia: Article;
@Input() indice: number;
@Input() enFavoritos; 

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private  dataLocalService: DataLocalService) { }

  ngOnInit() {}

abrirNoticia(){
  //console.log('noticias',this.noticia.url);
  const browser = this.iab.create(this.noticia.url, '_system'); // abro el navegador
}
async lanzarMenu(){

  let guardarBorrarBtn;

  if(this.enFavoritos) {
    guardarBorrarBtn = {
      text: 'Borrar-Favorito',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        console.log(' borrarfavorito');
        this.dataLocalService.borrarNoticia(this.noticia);
      }

    };
  } else {
     guardarBorrarBtn = {
      text: 'favorito',
      icon: 'star',
      cssClass: 'action-dark',
      handler: () => {
        console.log('favorito');
        this.dataLocalService.guardarNoticia(this.noticia);
       }
     };
    }


  const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            //console.log('Destructive clicked');
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );
          }
        },
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Canelar');
          }
        }
      ]
    });
 
  await actionSheet.present();
  }

}
