import {Action} from 'redux';
import {Category} from '../../components/categories/models/Category';


export const RENDER_CATEGORIES = '[Category] Render';
export const ADD_CATEGORY = '[Category] Add';
export const EDIT_CATEGORY = '[Category] Edit';
export const DELETE_CATEGORY = '[Category] DELETE';

export class RenderCategories implements Action{
  readonly type: string = RENDER_CATEGORIES;
  constructor(public payload: Category[]) {}
}

export class AddCategory implements Action{
  readonly type: string = ADD_CATEGORY;
  constructor(public payload: Category) {}
}

export class EditCategory implements Action {
  readonly type: string = EDIT_CATEGORY;
  constructor(public payload: Category) {}
}

export class DeleteCategory implements Action {
  readonly type: string = DELETE_CATEGORY;
  constructor(public payload: string) {}
}

export type Types = RenderCategories | AddCategory | EditCategory | DeleteCategory
