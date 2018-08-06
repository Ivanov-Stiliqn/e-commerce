import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';
import {MessageActions} from '../message.actions';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  isLogged;
  constructor(private router: Router, private message: MessageActions) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      this.isLogged =  localStorage.getItem('authtoken') !== null;
      if(!this.isLogged){
        this.message.warning('Login first, please !');
        this.router.navigateByUrl('/login')
      }

    return this.isLogged;
  }
}
