import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';

const cartRoutes: Routes = [
  {path: 'preview', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cartRoutes)],
  exports: [RouterModule]
})

export class CartRoutingModule {}
