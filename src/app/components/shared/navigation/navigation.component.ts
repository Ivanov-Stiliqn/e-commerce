import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {Category} from '../../categories/models/Category';
import {Observable} from 'rxjs';
import {User} from '../../users/models/User';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {CategoriesService} from '../../../core/services/categories.service';
import {select} from '@ngrx/store';
import {AuthenticationService} from '../../../core/services/authentication.service';

@Component ({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  user: User;
  categories: Observable<Category[]>;
  productsInCart: number;

  constructor(private router: Router,
              private message: MessageActions,
              private service: CategoriesService,
              private store: Store<AppState>,
              private authService: AuthenticationService) {}

  ngOnInit() {
    this.service.renderCategories().subscribe(() => {
      this.categories = this.store.pipe(select(state => state.categories.all));
    });

    this.store.pipe(select(state => state.cart.products)).subscribe(products => {
      this.productsInCart = products.length;
    });

    this.store.pipe(select(state => state.auth.current)).subscribe(user => {
      this.user = user;
    });
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
      this.message.success('Logout success !');
    })
  }
}
