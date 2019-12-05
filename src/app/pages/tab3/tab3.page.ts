import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sliderOpts = { // vuelve estatico el slide
    allowSlidePrev : false,
    allowSlideNext : false

  };


  constructor( public datalocalService: DataLocalService ) {
  }

 

}
