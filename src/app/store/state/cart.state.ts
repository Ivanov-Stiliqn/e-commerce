import {CartProduct} from '../../components/cart/models/cart-product.model';

export interface CartState {
  readonly products: CartProduct[],
  readonly total: number
}

export const CART_INITIAL_STATE = {
  products: [],
  total: 0
};
