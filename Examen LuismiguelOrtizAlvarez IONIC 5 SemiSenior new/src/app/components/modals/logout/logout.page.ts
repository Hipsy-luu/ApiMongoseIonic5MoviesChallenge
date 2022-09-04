import { DataSessionService } from './../../../services/dataSession/data-session.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public modalController: ModalController,/* private dataSessionService: DataSessionService */) { }

  ngOnInit() {
  }

  dismissModalLogout() {
    this.modalController.dismiss({
      logout : false,
    });
  }

  logOut(){
    //this.dataSessionService.logOut();
    this.modalController.dismiss({
      logout : true,
    });
  }
}
