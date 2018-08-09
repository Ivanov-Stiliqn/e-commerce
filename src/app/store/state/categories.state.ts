import {Category} from '../../components/categories/models/Category';

export interface CategoriesState {
  readonly all: Category[],
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  all: [],
};
