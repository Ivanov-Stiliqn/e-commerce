import {Category} from '../../components/categories/models/Category';
import * as CategoryActions from '../actions/categories.actions';


export function categoriesReducer(state: Category[] = [], action: CategoryActions.Types) {
  switch (action.type) {
    case CategoryActions.RENDER_CATEGORIES:
      return action.payload;
    case CategoryActions.ADD_CATEGORY:
      return [...state, action.payload];
    default:
      return state;
  }
}
