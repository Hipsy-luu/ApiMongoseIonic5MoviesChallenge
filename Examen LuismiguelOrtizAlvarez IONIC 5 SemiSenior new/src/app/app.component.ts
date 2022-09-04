import { UtilitiesService } from './services/utilities/utilities.service';
import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
/* import { SplashScreen } from '@ionic-native/splash-screen/ngx'; */
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataSessionService } from './services/dataSession/data-session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    //menu monitor
    {
      title: 'Bandeja de entrada',
      url: '/files',
      icon: 'home',
      type : 0
    },/*
    {
      title: 'Ajustes',
      url: '/user-settings',
      icon: 'settings',
      type : 0
    }, */
    {
      title: 'Ayuda',
      url: '/contact',
      icon: 'people-circle',
      type : 0
    },
  ];

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataSessionService: DataSessionService,
    public utilitiesService : UtilitiesService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    //SplashScreen.show({autoHide: true, showDuration: 5000, fadeInDuration: 0, fadeOutDuration: 500});
    
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#080c17');
      SplashScreen.hide();
    });
  }

  ngOnInit() {
      // SplashScreen.hide();
  }

  ionViewWillEnter() {
  }

  logOut(){
    this.dataSessionService.logOut();
  }
}
