import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './reducers/users.reducer';
import {categoriesReducer} from './reducers/categories.reducer';
import {productsReducer} from './reducers/products.reducer';

@NgModule({
  imports: [StoreModule.forRoot({
    auth: usersReducer,
    categories: categoriesReducer,
    products: productsReducer
  })],
  exports: [StoreModule]
})

export class AppStoreModule {}
