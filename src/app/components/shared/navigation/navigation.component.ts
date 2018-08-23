import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {Category} from '../../categories/models/Category';
import {Observable} from 'rxjs';
import {User} from '../../users/models/User';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {CategoriesService} from '../../../core/services/categories.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {CartService} from '../../../core/services/cart.service';
import {CurrencyService} from '../../../core/services/currency.service';
import {map} from 'rxjs/internal/operators';

@Component ({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  user: User;
  categories: Observable<Category[]>;
  productsInCart: number;
  searchClicked: boolean = false;
  input = '';
  currency: string;

  constructor(private router: Router,
              private message: MessageActions,
              private service: CategoriesService,
              private store: Store<AppState>,
              private authService: AuthenticationService,
              private cartService: CartService,
              private currencyService: CurrencyService) {}

  ngOnInit() {
    this.service.renderCategories().subscribe(() => {
      this.categories = this.store.pipe(map(state => state.categories.all));
    });

    this.cartService.renderProducts().subscribe(() => {
      this.store.pipe(map(state => state.cart.products)).subscribe(products => {
        this.productsInCart = products.length;
      });
    });


    this.store.pipe(map(state => state.auth.current)).subscribe(user => {
      this.user = user;
    });

    this.store.pipe(map(state => state.products.currency)).subscribe(data => {
      this.currency = data;
    })
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
      this.message.success('Logout success !');
    })
  }

  search(){
    this.searchClicked = !this.searchClicked;
  }

  searchProduct(){
     this.searchClicked = false;
     this.router.navigateByUrl(`/products/products-search/${this.input}`);
     this.input = '';
  }

  changeCurrency(){
    this.currencyService.changeCurrency(this.currency).subscribe(() => {
      this.message.success(`Currency changed to: ${this.currency}`);
      this.router.navigateByUrl('/')
    });
  }
}
