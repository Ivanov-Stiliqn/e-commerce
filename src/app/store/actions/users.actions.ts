import {Action} from 'redux';
import {User} from '../../components/users/models/User';


export const USER_REGISTER = '[User] Register';
export const USER_LOGIN = '[User] Login';
export const USER_LOGOUT = '[User] Logout';
export const SEED_USER = '[User] Seed';

export class RegisterUser implements Action {
  readonly type: string = USER_REGISTER;
  constructor(public payload: User) {}
}

export class LoginUser implements Action {
  readonly type: string = USER_LOGIN;
  constructor(public payload: User) {}
}

export class LogoutUser implements Action {
  readonly type: string = USER_LOGOUT;
  constructor(public payload?: User) {}
}

export class SeedUser implements Action {
  readonly type: string = SEED_USER;
  constructor(public payload: User) {}
}

export type Types =  RegisterUser | LoginUser | LogoutUser | SeedUser
