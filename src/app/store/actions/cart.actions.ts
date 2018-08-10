import {Action} from 'redux';
import {CartProduct} from '../../components/cart/models/cart-product.model';


export const RENDER_PRODUCTS = '[Cart] Render';
export const ADD_PRODUCT = '[Cart] Add';
export const REMOVE_PRODUCT = '[Cart] Remove';
export const CLEAR = '[Cart] Clear';

export class RenderProducts implements Action{
  readonly type: string = RENDER_PRODUCTS;
  constructor(public payload: CartProduct[]) {}
}

export class AddProduct implements Action{
  readonly type: string = ADD_PRODUCT;
  constructor(public payload: CartProduct) {}
}

export class RemoveProduct implements Action {
  readonly type: string = REMOVE_PRODUCT;
  constructor(public payload: string) {}
}

export class ClearCart implements Action {
  readonly type: string = CLEAR;
  constructor(public payload?: string) {}
}

export type Types = RenderProducts | AddProduct | RemoveProduct | ClearCart
