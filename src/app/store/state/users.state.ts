import {User} from '../../components/users/models/User';

export interface UsersState {
  readonly current: User
}

export const USERS_INITIAL_STATE: UsersState = {
  current: {} as User
};
