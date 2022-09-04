import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogoutPage } from '../../modals/logout/logout.page';
import { DataSessionService } from '../../../services/dataSession/data-session.service';

@Component({
  selector: 'app-nav-bar-client',
  templateUrl: './nav-bar-client.component.html',
  styleUrls: ['./nav-bar-client.component.scss'],
})
export class NavBarClientComponent implements OnInit {
  constructor(public modalController: ModalController,private dataSessionService : DataSessionService) { }

  ngOnInit() {}

  async presentModalLogout() {
    const modal = await this.modalController.create({
      component: LogoutPage,
      cssClass: 'logout-client-modal-class normal-shadow'
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if(data?.logout==true){
      this.dataSessionService.logOut();
    }
  }
}
