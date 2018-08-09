import {Product} from '../../components/products/models/Product';

export interface ProductsState {
  readonly all: Product[]
}

export const PRODUCTS_INITIAL_STATE: ProductsState = {
  all: []
};
