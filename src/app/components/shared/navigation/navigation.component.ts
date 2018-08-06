import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {Category} from '../../categories/models/Category';
import {Observable} from 'rxjs';
import {User} from '../../users/models/User';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import * as UserActions from '../../../store/actions/users.actions';
import * as CategoriesActions from '../../../store/actions/categories.actions';
import {CategoriesService} from '../../../core/services/categories.service';

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
              private store: Store<AppState>) {}

  ngOnInit(){
   this.categories = this.store.select('categories');

   this.service.renderCategories().subscribe(categories => {
      if(categories){
        this.store.dispatch(new CategoriesActions.RenderCategories(categories as Category[]));
      }
    });

   this.store.select(state => state.currentUser).subscribe(user => {
     this.isLogged = user.username !== undefined
   });
  }

  logout(event) {
    event.preventDefault();
    this.store.dispatch(new UserActions.LogoutUser());
    this.router.navigateByUrl('/');
    this.message.success('Logout success !');
  }

}
