import {UsersState} from './users.state';
import {ProductsState} from './products.state';
import {CategoriesState} from './categories.state';
import {CartState} from './cart.state';

export interface AppState  {
  readonly auth: UsersState,
  readonly products: ProductsState,
  readonly categories: CategoriesState,
  readonly cart: CartState
}
