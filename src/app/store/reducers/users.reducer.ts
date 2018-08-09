import {User} from '../../components/users/models/User';
import * as UserActions from '../actions/users.actions';
import {USERS_INITIAL_STATE, UsersState} from '../state/users.state';

export function usersReducer (state: UsersState = USERS_INITIAL_STATE, action: UserActions.Types) {
  switch (action.type){
    case UserActions.USER_LOGIN:
    case UserActions.USER_REGISTER:
      return Object.assign({}, state, {
        current: action.payload
      });
    case UserActions.USER_LOGOUT:
      localStorage.clear();
      return Object.assign({}, state, {
      current: null
    });
    default:
      return state;
  }
}
