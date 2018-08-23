import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {AppState} from '../../../store/state/app.state';
import {CategoryAddModel} from '../models/category-add.model';
import {CategoriesService} from '../../../core/services/categories.service';
import {validateCategory} from '../../../core/utilities/validator';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['../../shared/forms.css']
})
export class CategoryAddComponent {
  file: File = {} as File;
  category = new CategoryAddModel('','');

  constructor(private service: CategoriesService, private store: Store<AppState>, private router: Router, private message: MessageActions) {
  }

  fileUploaded(event) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    let check = validateCategory(this.category.name);
    if(check !== '') {
      this.message.error(check);
      return;
    }

    this.message.warning('Loading....');
    this.service.uploadImage(this.file)
      .subscribe(data => {
        this.category.image = data['url'];

        this.service.addCategory(this.category).subscribe(newCategory => {
          if(newCategory){
            this.router.navigateByUrl('/');
            this.message.success('Category added !');
          }
        })
      });
  }
}
