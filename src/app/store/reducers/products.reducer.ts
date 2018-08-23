import * as ProductsActions from '../actions/products.actions';
import {PRODUCTS_INITIAL_STATE, ProductsState} from '../state/products.state';
import {Product} from '../../components/products/models/Product';

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
    case ProductsActions.EDIT_PRODUCT:
      let editedProduct = action.payload as Product;
      return Object.assign({}, state, {
        all: [...state.all.filter(p => p._id !== editedProduct._id), editedProduct]
      });
    case ProductsActions.DELETE_PRODUCT:
      let removedProduct = action.payload as Product;
      return Object.assign({}, state, {
        all: state.all.filter(p => p._id !== removedProduct._id)
      });
    case ProductsActions.CHANGE_PRODUCTS_CURRENCY:
      let currency = action.payload['currency'];
      let rate = action.payload['rate'];
      return Object.assign({}, state, {
        currency: currency,
        rate: rate,
        currencyChanged: currency !== state.currency
      });
    default:
      return state;
  }
}
