import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel} from '../../components/users/models/login.model';
import {RegisterModel} from '../../components/users/models/register.model';
import {map} from 'rxjs/internal/operators';
import {User} from '../../components/users/models/User';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {LoginUser, LogoutUser, SeedUser} from '../../store/actions/users.actions';

const appKey = "kid_BJW3zX1Hm";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const getUserUrl = `https://baas.kinvey.com/user/${appKey}/`;

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(user: LoginModel){
    return this.http.post(loginUrl, JSON.stringify(user)).pipe(map(data => {
      this.store.dispatch(new LoginUser(data as User));
      return data as User;
    }))
  }

  register(user: RegisterModel){
    return this.http.post(registerUrl, JSON.stringify(user)).pipe(map(data => {
      return data as User;
    }))
  }

  logout(){
    return this.http.post(logoutUrl, {}).pipe(map(data => {
      this.store.dispatch(new LogoutUser())
    }))
  }

  seedUser(){
    let id = localStorage.getItem('id');
    if(id !== null) {
      this.http.get(getUserUrl + id).subscribe(data => {
        this.store.dispatch(new SeedUser(data as User));
      });
    }
  }
}
