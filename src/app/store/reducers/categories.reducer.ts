import * as CategoryActions from '../actions/categories.actions';
import {CATEGORIES_INITIAL_STATE, CategoriesState} from '../state/categories.state';


export function categoriesReducer(state: CategoriesState = CATEGORIES_INITIAL_STATE, action: CategoryActions.Types) {
  switch (action.type) {
    case CategoryActions.RENDER_CATEGORIES:
      return Object.assign({}, state, {
        all: action.payload
      });
    case CategoryActions.ADD_CATEGORY:
      return Object.assign({}, state, {
        all: [...state.all, action.payload]
      });
    default:
      return state;
  }
}
