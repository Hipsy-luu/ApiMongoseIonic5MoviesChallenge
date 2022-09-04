import {
  NavController,
  ModalController,
  IonRouterOutlet,
  LoadingController,
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { User } from '../../classes/user.class';
import { ApiDataService } from '../apiData/api-data.service';
import { UtilitiesService } from '../utilities/utilities.service';

import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { ServerMessage } from '../../classes/serverMessage.class';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { LoggedResponse } from '../../classes/loggedResponse.class';
import { filter } from 'rxjs/operators';
import { LogoutPage } from '../../components/modals/logout/logout.page';
import { CloseAppPage } from '../../components/modals/close-app/close-app.page';
import { SafeUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataSessionService {
  actualUser: User;
  actualUsers : User[];
  baseURL: string;
  previousUrl: string;
  actualUrl: string;

  isWeb: boolean;

  constructor(
    private apiDataService: ApiDataService,
    private utilitiesService: UtilitiesService,
    private storageWeb: Storage,
    private storage: NativeStorage,
    private router: Router /* private routerOutlet: IonRouterOutlet, */,
    public navCtrl: NavController,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public platform: Platform,
  ) {
    this.actualUser = new User();
    this.actualUsers = [];
    this.baseURL = apiDataService.baseURL;
    this.isWeb = false;

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.actualUrl;
        this.actualUrl = event.url;
        //this.previousUrl = event.url;
      });
    this.initBackBtnActions();

    let isWeb = false;

    if (this.platform.is('mobileweb')) {
      isWeb = true;
    }

    this.storage.getItem('actualUser').then(
      (actualUser) => {
        this.initSessionData(actualUser, isWeb);
      },
      async (error) => {
        //console.log(error);
        try {
          this.isWeb = true;
          let actualUser = await this.storageWeb.get('actualUser');

          this.initSessionData(actualUser, isWeb);
        } catch (error) {
          this.utilitiesService.presentToast('Error obteniendo el usuario de la cache',);
          this.navigateByUrl('/login');
          console.log('error');
        }
      }
    );
  }
  async loadLocalUsers(){
    try {
      if ( this.isWeb ) {
        let users = await this.storageWeb.get('users');

        if( users == null ) {
          await this.storageWeb.set('users', '[]');
        }
        this.actualUsers = JSON.parse( await this.storageWeb.get('users') );
      }else{
        let users = await this.storage.getItem('users');
        
        if(!users == null) {
          this.storageWeb.set('users', '[]');
        }
        this.actualUsers = JSON.parse( await this.storage.getItem('users') );    
      }
    } catch (error) {
      //console.log(error);
      
      this.utilitiesService.presentToast('Error iniciando storage de usuarios', 4000);
    }
  }

  async initSessionData(user: string, isWeb: boolean) {
    this.isWeb = isWeb;
    
    await this.loadLocalUsers();

    if (user == null) {
      if (this.isWeb) {
        this.storageWeb.set('actualUser', JSON.stringify(this.actualUser)).then(
          () => {
            console.log('Primer uso');
          },
          (error) => {
            this.utilitiesService.presentToast('Error iniciando storage', 4000);
          }
        );
      } else {
        this.storage.setItem('actualUser', JSON.stringify(this.actualUser)).then(
          () => {
            console.log('Primer uso');
          },
          (error) => {
            this.utilitiesService.presentToast('Error iniciando storage', 4000);
          }
        );
      }
    } else {
      this.actualUser = JSON.parse(user);
      // Acciones a realizar cuando el user estaba ya guardado pero la data para la interfaz no esta disponible
      // Se sabe que no esta disponible porque apenas se mando llamar el constructor
      if (this.actualUser.idUser != "") {
        this.setUserData(this.actualUser);
      } else {
        //this.navigateByUrl('/login');
        console.log('sin sesión');
      }
    }
  }

  async initBackBtnActions() {
    if (!this.utilitiesService.platform.is('desktop')) {
      this.utilitiesService.platform.backButton.subscribeWithPriority(
        2,
        (processNextHandler) => {
          if (this.previousUrl == '/login') {
            this.presentModalLogout();
          } else if (
            this.previousUrl == '/login'
          ) {
            this.presentModalCloseApp();
          } else {
            processNextHandler();
          }
        }
      );

      this.utilitiesService.platform.backButton.subscribeWithPriority(
        1,
        async (processNextHandler) => {
          let modal = await this.modalController.getTop();
          let loading = this.loadingController.getTop();
          if (modal) {
            if (!loading) {
              this.modalController.dismiss();
            }
          } else if (
            this.previousUrl == undefined ||
            (this.previousUrl == '/login') /* || !this.routerOutlet.canGoBack() */
          ) {
            this.presentModalCloseApp();
          } else if (
            this.actualUrl == '/home' &&
            this.previousUrl == '/client/home'
          ) {
            this.presentModalCloseApp();
          } else {
            processNextHandler();
          }
        }
      );
    }
  }

  async presentModalLogout() {
    const modal = await this.modalController.create({
      component: LogoutPage,
      cssClass: 'logout-client-modal-class normal-shadow',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    //console.log(data);

    if (data.logout == true) {
      this.logOut();
    }
  }

  async presentModalCloseApp() {
    const modal = await this.modalController.create({
      component: CloseAppPage,
      cssClass: 'logout-client-modal-class normal-shadow',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
  }

  async checkLogin(successCallBack, errorCallBack) {
    this.actualUser = new User();

    if (this.isWeb == true) {
      let user = await this.storageWeb.get('actualUser');

      if(user){
        this.actualUser = JSON.parse( user );
      }
    }else{
      let user = await this.storage.getItem('actualUser');

      if(user){
        this.actualUser = JSON.parse( user );
      }
    }

    if ( this.actualUser.idUser == "" ) {
      errorCallBack(new LoggedResponse(true, 'Sin user'));
    } else {

      let alreadyIndexed : number = this.actualUsers.findIndex(user => {
        return user.email == this.actualUser.email && user.password == this.actualUser.password
      });
      
      if(alreadyIndexed == -1) {
        errorCallBack(new LoggedResponse(true, 'Sin user'));
      }else{
        this.actualUser = JSON.parse(JSON.stringify(this.actualUsers[alreadyIndexed]));
        //this.setUserData(this.actualUser);
        successCallBack(
          new LoggedResponse(false, 'Con usuario actualizado')
        );
      }
      
    }
  }

  async logOut() {
    this.setUserData(new User());
    this.navigateByUrl('/login');
  }

  loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      let alreadyIndexed : number = this.actualUsers.findIndex(user => {
        return user.email == email && user.password == password
      });
      
      if(alreadyIndexed == -1) {
        resolve(new ServerMessage(true,"Email y/o contraseña incorrectos",{}));
      }else{
        this.actualUser = JSON.parse(JSON.stringify(this.actualUsers[alreadyIndexed]));
        //this.setUserData(this.actualUser);
        resolve(new ServerMessage(false,"Inicio exitoso",this.actualUser));
      }
    });
  }

  async setUserData(updatedData: any) {
      this.actualUser.idUser = updatedData.idUser;
      this.actualUser.email = updatedData.email;
      this.actualUser.firstName = updatedData.firstName;
      this.actualUser.lastName = updatedData.lastName;
      this.actualUser.phone = updatedData.phone;
      this.actualUser.password = updatedData.password;

      if (this.isWeb) {
        await this.storageWeb.set('actualUser', JSON.stringify(updatedData));
      } else {
        await this.storage.setItem('actualUser', JSON.stringify(updatedData));
      }
  }
  
  registerUser(newUserData: User) : Promise<ServerMessage> {
    return new Promise(async (resolve, reject) => {
      /* check if email exists */
      let index = this.actualUsers.findIndex(user => user.email == newUserData.email);
      
      if(index == -1) {
        this.actualUsers.push(newUserData);

        if (this.isWeb) {
          await this.storageWeb.set('users', JSON.stringify(this.actualUsers));
        } else {
          await this.storage.setItem('users', JSON.stringify(this.actualUsers));
        }
        resolve(new ServerMessage(false,"Usuario creado con exito",newUserData));
      }else{
        resolve(new ServerMessage(true,"Email ya registrado",newUserData));
      }
    });
  }

  navigateByUrl(url: string, opts?: NavigationExtras) {
    this.router.navigate([url], opts);
  }

  goBack() {
    this.navCtrl.back();
  }
}
