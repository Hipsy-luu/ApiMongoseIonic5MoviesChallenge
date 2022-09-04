import { DataSessionService } from './../../../services/dataSession/data-session.service';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

const { App } = Plugins;

@Component({
  selector: 'app-close-app',
  templateUrl: './close-app.page.html',
  styleUrls: ['./close-app.page.scss'],
})
export class CloseAppPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModalCloseApp() {
    this.modalController.dismiss({
      close : false,
    });
  }

  closeApp(){
    //this.dataSessionService.logOut();
    this.modalController.dismiss({
      close : true,
    });
  }
}
