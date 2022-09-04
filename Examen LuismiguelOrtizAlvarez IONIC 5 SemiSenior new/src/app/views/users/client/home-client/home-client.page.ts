import { FullMoviePage } from './../../../../components/modals/fullMovie/fullMovie.page';
import { Component, OnInit } from '@angular/core';
import { DataSessionService } from '../../../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../../../services/utilities/utilities.service';
import { LoggedResponse } from '../../../../classes/loggedResponse.class';
import { ApiDataService } from '../../../../services/apiData/api-data.service';
import { ServerMessage } from '../../../../classes/serverMessage.class';
import { Movie } from '../../../../classes/movie.class';
import { LogoutPage } from '../../../../components/modals/logout/logout.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
})
export class HomeClientPage implements OnInit {
  movieList: Movie[];

  // variables del paginador
  page = 1;
  pageSize = 9;
  alertPage = 1;
  searchText: string;

  constructor(public dataSessionService: DataSessionService,
    public modalController: ModalController, private utilitiesService: UtilitiesService, 
    private apiDataService: ApiDataService) {
    this.movieList = [];
    this.searchText = '';
  }

  async ionViewDidEnter() {
    // await this.dataSessionService.logOut();
    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      this.loadData();
    }, (noLoginResponse: LoggedResponse) => {
      console.log(noLoginResponse);
      this.utilitiesService.presentToast("Error verificando session actual");
      this.dataSessionService.logOut();
    });
  }

  async ngOnInit() {

  }

  loadData() {
    this.utilitiesService.presentLoading('Cargando', async (loadingAnimation) => {
      this.apiDataService.getAllMovies().then(async (response: any) => {
        this.movieList = response;
        await loadingAnimation.dismiss();
      }).catch(async (error) => {
        console.log(error);
        await loadingAnimation.dismiss();
        this.utilitiesService.presentToast("No se pudieron cargar las peliculas");
      });
    });
  }

  async openFullMovieData(movie : Movie){

    const modal = await this.modalController.create({
      component: FullMoviePage,
      cssClass: 'normal-shadow',
      componentProps: {
        movieSelected : movie
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
  }

  loadDataBySearch() {
    if (this.searchText.length == 0) {
      this.loadData();
      return;
    }

    this.utilitiesService.presentLoading('Buscando', async (loadingAnimation) => {
      this.apiDataService.doSearchMoviesByName(this.searchText).then(async (response: any[]) => {
        //this.movieList = response;
        let moviesFixed = await response.map(movie => {
          return Object.assign({
            _embedded : movie
          });
        })
        this.movieList = moviesFixed;

        await loadingAnimation.dismiss();
      }).catch(async (error) => {
        console.log(error);
        await loadingAnimation.dismiss();
        this.utilitiesService.presentToast("No se pudieron cargar las peliculas");
      });
    });
  }

  setPageSize(event) {
    this.pageSize = parseInt(event.detail.value);
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.utilitiesService.FILTER_PAG_REGEX, '');
  }

}
