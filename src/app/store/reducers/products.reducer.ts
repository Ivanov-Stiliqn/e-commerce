import * as ProductsActions from '../actions/products.actions';
import {PRODUCTS_INITIAL_STATE, ProductsState} from '../state/products.state';

export function productsReducer (state: ProductsState = PRODUCTS_INITIAL_STATE, action: ProductsActions.Types) {
  switch(action.type) {
    case ProductsActions.RENDER_PRODUCTS:
      return Object.assign({}, state, {
        all: action.payload
      });
    case ProductsActions.ADD_PRODUCT:
      return Object.assign({}, state, {
        all: [...state.all, action.payload]
      });
    default:
      return state;
  }
}
