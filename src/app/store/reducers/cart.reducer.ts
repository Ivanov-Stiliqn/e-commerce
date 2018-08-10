import {CART_INITIAL_STATE, CartState} from '../state/cart.state';
import * as CartActions from '../actions/cart.actions'
import {CartProduct} from '../../components/cart/models/cart-product.model';

export function cartReducer(state: CartState = CART_INITIAL_STATE, action: CartActions.Types){
  switch (action.type){
    case CartActions.RENDER_PRODUCTS:
      let total = 0;
      let products = action.payload as CartProduct[];
      products.forEach(p => total += p.price * p.quantity);
      return Object.assign({}, state, {
        products: action.payload,
        total: total
      });
    case CartActions.ADD_PRODUCT:
      let newProduct = action.payload as CartProduct;
      return Object.assign({}, state, {
        products: [...state.products, newProduct],
        total: state.total + newProduct.price * newProduct.quantity
      });
    case CartActions.REMOVE_PRODUCT:
      let product = state.products.filter(p => p._id === action.payload)[0];
      return Object.assign({}, state, {
        products: state.products.filter(p => p._id !== action.payload),
        total: state.total - product.price * product.quantity
      });
    case CartActions.CLEAR:
      return Object.assign({}, state, {
        products: [],
        total: 0
      });
    default:
      return state;
  }
}
