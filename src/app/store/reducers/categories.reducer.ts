import * as CategoryActions from '../actions/categories.actions';
import {CATEGORIES_INITIAL_STATE, CategoriesState} from '../state/categories.state';
import {Category} from '../../components/categories/models/Category';


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
    case CategoryActions.EDIT_CATEGORY: {
      let editedCategory = action.payload as Category;
      return Object.assign({}, state, {
        all: [...state.all.filter(c => c._id !== editedCategory._id), editedCategory]
      });
    }
    case CategoryActions.DELETE_CATEGORY:
      let deletedCategoryID = action.payload as string;
      return Object.assign({}, state, {
        all: state.all.filter(c => c._id !== deletedCategoryID)
      });
    default:
      return state;
  }
}
