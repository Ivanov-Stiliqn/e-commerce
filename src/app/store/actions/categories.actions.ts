import {Action} from 'redux';
import {Category} from '../../components/categories/models/Category';


export const RENDER_CATEGORIES = '[Category] Render';
export const ADD_CATEGORY = '[Category] Add';

export class RenderCategories implements Action{
  readonly type: string = RENDER_CATEGORIES;
  constructor(public payload: Category[]) {}
}

export class AddCategory implements Action{
  readonly type: string = ADD_CATEGORY;
  constructor(public payload: Category) {}
}

export type Types = RenderCategories | AddCategory
