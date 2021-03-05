import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor(private nav: NavController) {

  }
  async canLoad(): Promise<boolean> {
    const visto = await localStorage.getItem('intro');
    if (visto) {
      return true;
    } else {
      this.nav.navigateRoot('intro')
      return true;
    }
  }
  
}
