import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../core/services/cart.service';
import {CartProduct} from '../models/cart-product.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {MessageActions} from '../../../core/message.actions';
import {User} from '../../users/models/User';
import {Router} from '@angular/router';
import {ProductsService} from '../../../core/services/products.service';
import {MailService} from '../../../core/services/mail.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: CartProduct[];
  total: Observable<number>;
  user: User;

  constructor(private cartService: CartService,
              private store: Store<AppState>,
              private message: MessageActions,
              private router: Router,
              private productsService: ProductsService,
              private mailService: MailService) { }

  ngOnInit() {
    this.cartService.renderProducts().subscribe(data => {
      this.products = data;
    });

    this.total = this.store.pipe(map(state => state.cart.total));
    this.store.pipe(map(state => state.auth.current)).subscribe(data => {
      this.user = data;
    });
  }

  checkOut(){
    try{
      this.productsService.updateProductsQuantity();
      this.mailService.sendEmail(this.user.username, this.user.email, this.user.phone).subscribe(() => {});
      this.cartService.clearCart().subscribe(() => {
        this.message.success('Order submitted! Our admin will contact you soon.');
        this.router.navigateByUrl('/');
      });
    }
    catch(err){
      this.message.error(err.message);
    }

  }
}
