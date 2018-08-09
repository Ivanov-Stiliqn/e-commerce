import {UsersState} from './users.state';
import {ProductsState} from './products.state';
import {CategoriesState} from './categories.state';

export interface AppState  {
  readonly auth: UsersState,
  readonly products: ProductsState,
  readonly categories: CategoriesState
}
