import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../core/services/cart.service';
import {CartProduct} from '../models/cart-product.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {MessageActions} from '../../../core/message.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: CartProduct[];
  total: Observable<number>;

  constructor(private service: CartService, private store: Store<AppState>, private message: MessageActions) { }

  ngOnInit() {
    this.service.renderProducts().subscribe(data => {
      this.products = data;
    });

    this.total = this.store.pipe(map(state => state.cart.total));
  }

  checkOut(){
    this.service.sendEmail();
    this.message.success('Order sent to admin !');
  }

}
