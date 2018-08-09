import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {Category} from '../../categories/models/Category';
import {Observable} from 'rxjs';
import {User} from '../../users/models/User';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import * as UserActions from '../../../store/actions/users.actions';
import * as CategoriesActions from '../../../store/actions/categories.actions';
import {CategoriesService} from '../../../core/services/categories.service';
import {select} from '@ngrx/store';
import {AuthenticationService} from '../../../core/services/authentication.service';

@Component ({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  isLogged: boolean;
  categories: Observable<Category[]>;

  constructor(private router: Router,
              private message: MessageActions,
              private service: CategoriesService,
              private store: Store<AppState>,
              private authService: AuthenticationService) {}

  ngOnInit(){
   this.service.renderCategories().subscribe(() => {
        this.categories = this.store.pipe(select(state => state.categories.all));
    });

   this.store.pipe(select(state => state.auth.current)).subscribe(user => {
     this.isLogged = user !== null;
   })
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
      this.message.success('Logout success !');
    })
  }
}
