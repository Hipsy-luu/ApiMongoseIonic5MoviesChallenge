import { DataSessionService } from '../../../services/dataSession/data-session.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../../classes/movie.class';

@Component({
  selector: 'app-fullMovie',
  templateUrl: './fullMovie.page.html',
  styleUrls: ['./fullMovie.page.scss'],
})
export class FullMoviePage implements OnInit {
  @Input() movieSelected : Movie;

  constructor(public modalController: ModalController,/* private dataSessionService: DataSessionService */) { }

  ngOnInit() {
    console.log(this.movieSelected);
    
  }

  dismissModal() {
    this.modalController.dismiss({

    });
  }
}
