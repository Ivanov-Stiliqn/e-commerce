import {Component} from '@angular/core';
import {RegisterModel} from '../models/register.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {MessageActions} from '../../../core/message.actions';


@Component ({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../../shared/forms.css']
})

export class RegisterComponent {
  user = new RegisterModel('', '', '', '', '', '', 'false');
  confirmPass = '';

  constructor(private router: Router,
              private message: MessageActions,
              private service: AuthenticationService) {}

  onSubmit() {
    this.service.register(this.user).subscribe(user => {
      if(user) {
        this.router.navigateByUrl('/');
        this.message.success('Register successful !');
      }
    })
  }
}
