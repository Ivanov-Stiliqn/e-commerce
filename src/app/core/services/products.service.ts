import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductAddModel} from '../../components/products/models/product-add.model';
import {Product} from '../../components/products/models/Product';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {map} from 'rxjs/internal/operators';
import {AddProduct, RenderProducts} from '../../store/actions/products.actions';
import {forkJoin, Observable} from 'rxjs';

const appKey = 'kid_BJW3zX1Hm';
const url = `https://baas.kinvey.com/appdata/${appKey}/products`;
let productsCache: boolean = false;

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  renderProducts() {
    if (productsCache) {
      return Observable.create((observer) => {
        return this.store.pipe(select(state => state.products.all)).subscribe(data => {
          observer.next(data);
        });
      });
    }

    return this.http.get(url).pipe(map(data => {
      if (data) {
        let products = data as Product[];
        this.store.dispatch(new RenderProducts(products));
        productsCache = true;
        return products;
      }
    }));
  }

  renderProductsByCategory(id) {
    if(productsCache){

      return Observable.create((observer) => {
        return this.store.pipe(select(state => state.products.all.filter(p => p.category === id))).subscribe(products => {
          return observer.next(products)
        })

      })
    }

    return this.http.get(url + `?query={"category": "${id}"}`).pipe(map(data => {
      return data as Product[]
    }));
  }

  getProductById(id){
    if(productsCache){

      return Observable.create((observer) => {
        return this.store.pipe(select(state => state.products.all.filter(p => p._id === id)[0])).subscribe(product => {
           observer.next(product)
        })
      });
    }

    return this.http.get(url + '/' + id).pipe(map(data => {
      return data as Product
    }));
  }

  uploadImages(files: File[]) {
    let observables = [];
    for (let file of files) {
      let fd = new FormData();
      fd.append('upload_preset', 'ggmysyok');
      fd.append('file', file);

      observables.push(this.http.post(`https://api.cloudinary.com/v1_1/db1ihpdcx/image/upload`, fd));
    }

    return forkJoin(...observables);
  }

  addProduct(product: ProductAddModel) {
    return this.http.post(url, product)
      .pipe(map(data => {
        if (data) {
          let newProduct = data as Product;
          this.store.dispatch(new AddProduct(newProduct));
          return newProduct;
        }
      }));
  }
}
