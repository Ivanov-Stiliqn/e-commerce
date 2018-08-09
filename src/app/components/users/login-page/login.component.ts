import {Component} from '@angular/core';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import * as UserActions from '../../../store/actions/users.actions';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {User} from '../models/User';


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/forms.css']
})

export class LoginComponent {
  user = new LoginModel('', '');
  bannerImage = 'http://applerepairahmedabad.com/wp-content/uploads/2016/04/banner_full.gif';

  constructor(private router: Router,
              private message: MessageActions,
              private service: AuthenticationService
              ) {
  }

  onSubmit() {
    this.service.login(this.user).subscribe(user => {
      if(user) {
        this.router.navigateByUrl('/');
        this.message.success('Login successful !');
      }
    })
  }
}
