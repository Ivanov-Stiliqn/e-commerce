import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel} from '../../components/users/models/login.model';
import {RegisterModel} from '../../components/users/models/register.model';

const appKey = "kid_BJW3zX1Hm";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(user: LoginModel){
    return this.http.post(loginUrl, JSON.stringify(user))
  }

  register(user: RegisterModel){
    return this.http.post(registerUrl, JSON.stringify(user))
  }

  logout(){
    return this.http.post(logoutUrl, {})
  }
}
