import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './reducers/users.reducer';
import {categoriesReducer} from './reducers/categories.reducer';
import {productsReducer} from './reducers/products.reducer';
import {cartReducer} from './reducers/cart.reducer';

@NgModule({
  imports: [StoreModule.forRoot({
    auth: usersReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer
  })],
  exports: [StoreModule]
})

export class AppStoreModule {}
