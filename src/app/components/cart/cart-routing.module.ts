import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CanActivateRouteGuard} from '../../core/guards/auth.guard';

const cartRoutes: Routes = [
  {path: 'preview', component: CartComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [CanActivateRouteGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(cartRoutes)],
  exports: [RouterModule]
})

export class CartRoutingModule {}
