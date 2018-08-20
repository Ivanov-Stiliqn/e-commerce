import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';
import {MessageActions} from '../message.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {User} from '../../components/users/models/User';
import {map} from 'rxjs/internal/operators';


@Injectable()
export class AdminGuard implements CanActivate {
  isAdmin: boolean;
  user: User;
  constructor(private router: Router, private message: MessageActions, private store: Store<AppState>) {
    this.store.pipe(map(state => state.auth.current)).subscribe(data => {
      this.user = data;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isAdmin =  this.user !== undefined && this.user.isAdmin === 'true';
    if(!this.isAdmin){
      this.message.warning('You are not authorized to go there !');
      this.router.navigateByUrl('/')
    }

    return this.isAdmin;
  }
}
