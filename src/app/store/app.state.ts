import {Category} from '../components/categories/models/Category';
import {Product} from '../components/products/models/Product';
import {User} from '../components/users/models/User';

export interface AppState  {
  readonly currentUser: User,
  readonly products: Product[],
  readonly categories: Category[]
}
