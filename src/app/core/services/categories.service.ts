import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryAddModel} from '../../components/categories/models/category-add.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {Category} from '../../components/categories/models/Category';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {AddCategory, DeleteCategory, EditCategory, RenderCategories} from '../../store/actions/categories.actions';
import {select} from '@ngrx/store';

const appKey = 'kid_BJW3zX1Hm';
const url = `https://baas.kinvey.com/appdata/${appKey}/categories`;
let categoryCache: boolean = false;

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  renderCategories() {
    if(categoryCache){
      return Observable.create((observer) => {
        observer.next();
      });
    }

    return this.http.get(url).pipe(map(data => {
      let categories = data as Category[];
      this.store.dispatch(new RenderCategories(categories));
      return data as Category[];
    }));
  }

  uploadImage(file: File){
    let fd = new FormData();
    fd.append('upload_preset', 'ggmysyok');
    fd.append('file', file);

    return this.http.post(`https://api.cloudinary.com/v1_1/db1ihpdcx/image/upload`, fd);
  }

  addCategory(category: CategoryAddModel){
    return this.http.post(url, category).pipe(map(data => {
      if(data){
        let newCategory = data as Category;
        this.store.dispatch(new AddCategory(newCategory));
        return newCategory;
      }
    }));
  }

  getCategoryById(id){
    if(categoryCache){
      return Observable.create((observer) => {
        return this.store.pipe(select(state => state.categories.all.filter(c => c._id === id)[0])).subscribe(category => {
          observer.next(category)
        })
      });
    }

    return this.http.get(url + '/' + id).pipe(map(data => {
      return data as Category
    }));
  }

  editCategory(id: string, category: CategoryAddModel) {
    return this.http.put(url + '/' + id, category)
      .pipe(map(data => {
        if (data) {
          let editedCategory = data as Category;
          this.store.dispatch(new EditCategory(editedCategory));
          return editedCategory;
        }
      }));
  }

  deleteCategory(id) {
    return this.http.delete(url + '/' + id)
      .pipe(map(res => {
        if(res) {
          this.store.dispatch(new DeleteCategory(id));
          return res;
        }
      }))
  }
}
