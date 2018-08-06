import {Action} from 'redux';
import {Product} from '../../components/products/models/Product';


export const RENDER_PRODUCTS = '[Product] Render';
export const ADD_PRODUCT = '[Product] Add';

export class RenderProducts implements Action{
  readonly type: string = RENDER_PRODUCTS;
  constructor(public payload: Product[]) {}
}

export class AddProduct implements Action{
  readonly type: string = ADD_PRODUCT;
  constructor(public payload: Product) {}
}

export type Types = RenderProducts | AddProduct
