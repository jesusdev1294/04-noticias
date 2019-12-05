import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


const apiKey = environment.apiKey;
const apiUlr = environment.apiUlr;
const headers = new HttpHeaders ({
 'X-Api-key': apiKey
});   // headers para la peticion de cada uno cuando lo manden es reutilizar el servicio

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
    headlinesPages = 0; // contador para elnumero de las paginas de noticias
    categoriaActual='';
    categoriaPage=0;
  constructor(private http: HttpClient) { }

  // funcion para reutilizar el servicio y colocar el ednpoind que yo quiero utilizar
  private ejecutarQuery <T>( query: string) { // la T significa que va retornar un tipo de dato

    query = apiUlr + query; // junto el url con el query de datos

    return this.http.get<T>(query, {headers}); // mandas el query del servicio, La T mando el mismo tipo que recibo

  }  // para reutilizar todos los servicios , mandamos el query que queremos utilizar.

   getTopHeadlines() {
    this.headlinesPages ++; // Numero de pagina que voy a evaluar de las noticias para infinite scroll
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPages}`);

    // tslint:disable-next-line: max-line-length
           // return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=us&apiKey=380c22fb1a104471918c562ef03f25b1');
  } // regresa un observable

  getTopHeadLinesCategoria( categoria: string){

    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    } else{
      this.categoriaPage=1;
      this.categoriaActual= categoria;
    }

    // tslint:disable-next-line: max-line-length
  //  return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=380c22fb1a104471918c562ef03f25b1');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);  // inserto categoria.
  }
}
