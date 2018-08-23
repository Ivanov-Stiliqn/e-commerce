import {Component} from '@angular/core';
import {RegisterModel} from '../models/register.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {MessageActions} from '../../../core/message.actions';
import {validateRegister} from '../../../core/utilities/validator';

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
    let check = validateRegister(this.user.username,
      this.user.password, this.confirmPass,
      this.user.firstName,
      this.user.lastName,
      this.user.email,
      this.user.phone);

    if(check !== ''){
      this.message.error(check);
      return;
    }

    this.service.register(this.user).subscribe(user => {
      if(user) {
        this.router.navigateByUrl('/login');
        this.message.success('Register successful! Now you should be able to login.');
      }
    })
  }
}
