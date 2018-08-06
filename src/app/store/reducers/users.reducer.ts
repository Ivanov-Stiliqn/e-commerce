import {User} from '../../components/users/models/User';
import * as UserActions from '../actions/users.actions';

export function usersReducer (state: User = {} as User, action: UserActions.Types) {
  switch (action.type){
    case UserActions.USER_LOGIN:
    case UserActions.USER_REGISTER:
      return action.payload;
    case UserActions.USER_LOGOUT:
      localStorage.clear();
      return {};
    default:
      return state;
  }
}
