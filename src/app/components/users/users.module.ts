import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutesModule} from '../../core/routes.module';
import {LoginComponent} from './login-page/login.component';
import {RegisterComponent} from './register-page/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../../core/services/authentication.service';
import {BannerComponent} from './banner/banner.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, BannerComponent],
  imports: [CommonModule, RoutesModule, FormsModule, HttpClientModule],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthenticationService]
})

export class UsersModule {}
