import {Component} from '@angular/core';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {AuthenticationService} from '../../../core/services/authentication.service';


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/forms.css']
})

export class LoginComponent {
  user = new LoginModel('', '');

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
