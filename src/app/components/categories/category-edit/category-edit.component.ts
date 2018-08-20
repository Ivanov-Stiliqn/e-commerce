import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {CategoryAddModel} from '../models/category-add.model';
import {CategoriesService} from '../../../core/services/categories.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['../../shared/forms.css']
})
export class CategoryEditComponent implements OnInit {
  file: File = {} as File;
  category = new CategoryAddModel('','');
  id: string;

  constructor(private service: CategoriesService,
              private store: Store<AppState>,
              private router: Router,
              private message: MessageActions,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap['params']['id'];
      this.service.getCategoryById(this.id).subscribe(data => {
        this.category = data;
      })
    })
  }

  fileUploaded(event) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    this.message.warning('Loading....');
    if(this.file.name !== undefined){

      this.service.uploadImage(this.file)
        .subscribe(data => {
          this.category.image = data['url'];

          this.service.editCategory(this.id, this.category).subscribe(newCategory => {
            if(newCategory){
              this.router.navigateByUrl('/categories/all');
              this.message.success(`Category ${this.category.name} edited !`);
            }
          })
        });
    }
    else {
      this.service.editCategory(this.id, this.category).subscribe(newCategory => {
        if(newCategory){
          this.router.navigateByUrl('/categories/all');
          this.message.success(`Category ${this.category.name} edited !`);
        }
      })
    }
  }
}
