import {Product} from '../../components/products/models/Product';
import * as ProductsActions from '../actions/products.actions';

export function productsReducer (state: Product[] = [], action: ProductsActions.Types) {
  switch(action.type) {
    case ProductsActions.RENDER_PRODUCTS:
      return action.payload;
    case ProductsActions.ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}
