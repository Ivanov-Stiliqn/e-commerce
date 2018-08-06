import {Component} from '@angular/core';
import {RegisterModel} from '../models/register.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import * as UserActions from '../../../store/actions/users.actions';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {User} from '../models/User';
import {MessageActions} from '../../../core/message.actions';


@Component ({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../authorization.form.css']
})

export class RegisterComponent {
  user = new RegisterModel('', '', '', '', '', '');
  confirmPass = '';

  constructor(private router: Router,
              private message: MessageActions,
              private store: Store<AppState>,
              private service: AuthenticationService) {}

  onSubmit() {
    this.service.register(this.user).subscribe(user => {
      if(user) {
        this.store.dispatch(new UserActions.RegisterUser(user as User));
        this.router.navigateByUrl('/');
        this.message.success('Register successful !');
      }
    })
  }
}
