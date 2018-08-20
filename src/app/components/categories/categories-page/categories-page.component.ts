import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {MessageActions} from '../../../core/message.actions';
import {Observable} from 'rxjs';
import {Category} from '../models/Category';
import {map} from 'rxjs/internal/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import {CategoriesService} from '../../../core/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  animations: [
    trigger('listCategories', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),])]
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private store: Store<AppState>,
              private message: MessageActions,
              private service: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.store.pipe(map(state => state.categories.all));
  }

  deleteCategory(id){
    this.service.deleteCategory(id).subscribe(res => {
      if(res) {
        this.message.success(`Category deleted !`);
      }
    })
  }

}
