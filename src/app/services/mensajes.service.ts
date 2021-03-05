import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
    private toastCtrl: ToastController,
    private nav: NavController,
    private router: Router
    ) { }
  async showToast(estado, mensaje, color){
    const toast = await this.toastCtrl.create({
      header: estado,
      message: mensaje,
      color,
      duration: 1500
    });
    toast.present();
  }
}
