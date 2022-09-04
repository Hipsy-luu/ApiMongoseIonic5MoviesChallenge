import { Inject, Injectable } from '@angular/core';
import { ToastController, ModalController, LoadingController, NavController } from '@ionic/angular';
/* import { AlertsPage } from '../../components/modals/alerts/alerts.page'; */
/* import {File} from "@ionic-native/file"; */
/* import {FileOpener} from "@ionic-native/file-opener"; */
import { DOCUMENT } from '@angular/common';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(private navCtrl: NavController, public toastController: ToastController,@Inject(DOCUMENT) private dom,
    public modalController: ModalController, public loadingController: LoadingController,
    public platform: Platform) {

  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  capitalizeAllWords(string : string){
    //return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }
  sentenceCase(input, lowercaseBefore = undefined) {
    input = ( input === undefined || input === null ) ? '' : input;
    if (lowercaseBefore) { input = input.toLowerCase(); }
    return input.toString().replace( /(^|\. *)([a-z])/g, function(match, separator, char) {
        return separator + char.toUpperCase();
    });
  }
  //TOAST
  async presentToast(message: string, time: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: time,
      position: 'top',
      //header : "Error",
      cssClass : 'ingmulti-toast',//string | string[],
      //buttons?: (ToastButton | string)[],
      //position?: 'top' | 'bottom' | 'middle',
      translucent : true,
      animated: true,

      //color?: Color,
      //mode?: Mode,
      //keyboardClose : true,
      //id?: string,
    });
    toast.present();
  }

  async presentToastWithOptions(title: string, message: string, time: number) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      position: 'top',
      duration: time
    });
    toast.present();
  }


  //Tiempo
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  goBack() {
    this.navCtrl.back();
  }

  async presentModalAlert(alertData ) {
    /* const modal = await this.modalController.create({
      component: AlertsPage,
      cssClass: 'modal-alert',
      componentProps: {
        'alertData': alertData
      }
    });
    return await modal.present(); */
  }

  async presentLoading(message: string, callBack) {
    const loading : HTMLIonLoadingElement = await this.loadingController.create({
      //spinner: "bubbles",
      spinner : null,
      //duration: 5000,
      message: message,
      translucent: true,
      cssClass: 'loading-class-theme',
      backdropDismiss: false
    });
    await loading.present();

    //const { role, data } = await loading.onDidDismiss();
    callBack(loading)
  }

  async presentLoadingWithOptions(callBack) {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    //const { role, data } = await loading.onDidDismiss();
    callBack(loading)
  }

}
