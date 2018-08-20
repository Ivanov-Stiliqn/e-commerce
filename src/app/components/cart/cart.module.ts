import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {TokenInterceptor} from '../../core/interceptors/token.interceptor';
import {RadarSpinnerModule} from 'angular-epic-spinners';
import {CartRoutingModule} from './cart-routing.module';
import {CartService} from '../../core/services/cart.service';
import {CartComponent} from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RadarSpinnerModule],
  exports: [],
  providers: [CartService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class CartModule {}
