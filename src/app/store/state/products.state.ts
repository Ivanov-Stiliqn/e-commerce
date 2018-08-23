import {Product} from '../../components/products/models/Product';

export interface ProductsState {
  readonly all: Product[],
  readonly currency: string,
  readonly rate: number,
  readonly currencyChanged: boolean;
}

export const PRODUCTS_INITIAL_STATE: ProductsState = {
  all: [],
  currency: 'USD',
  rate: 1,
  currencyChanged: false
};
