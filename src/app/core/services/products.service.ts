import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductAddModel} from '../../components/products/models/product-add.model';
import {Product} from '../../components/products/models/Product';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {map} from 'rxjs/internal/operators';
import {AddProduct, DeleteProduct, EditProduct, RenderProducts} from '../../store/actions/products.actions';
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

    return this.http.get(url + '?sort={"_kmd.ect": -1}').pipe(map(data => {
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

    return this.http.get(url + `?query={"category": "${id}"}&sort={"_kmd.ect": -1}`).pipe(map(data => {
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

  editProduct(id: string, product: ProductAddModel) {
    return this.http.put(url + '/' + id, product)
      .pipe(map(data => {
        if (data) {
          let editedProduct = data as Product;
          this.store.dispatch(new EditProduct(editedProduct));
          return editedProduct;
        }
      }));
  }

  deleteProduct(product: Product) {
    return this.http.delete(url + '/' + product._id)
      .pipe(map(res => {
        if(res) {
          this.store.dispatch(new DeleteProduct(product));
          return res;
        }
      }));
  }

  getProductByName(name) {
    if(productsCache){

      return Observable.create((observer) => {
        return this.store.pipe(select(state => state.products.all.filter(p => p.name.toLowerCase().includes(name.toLowerCase())))).subscribe(products => {
          observer.next(products)
        })
      });
    }

    return Observable.create((observer) => {
      this.renderProducts().subscribe(products => {
        let searchedProducts = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        observer.next(searchedProducts)
      })
    })
  }

  addReview(product: Product) {
    return this.http.put(url + '/' + product._id, product)
      .pipe(map(data => {
        if (data) {
          let editedProduct = data as Product;
          this.store.dispatch(new EditProduct(editedProduct));
          return editedProduct;
        }
      }));
  }

  updateProductsQuantity(){
    let products = JSON.parse(localStorage.getItem('cart'));
    let productsIds = products.map(p => '"' + p._id + '"');
    let observables = [];

    this.http.get(url + `?query={"_id": {"$in": [${productsIds}]}}`).subscribe(data => {
      for (let product of data as Product[]) {
        product.quantity -= products.filter(p => p._id === product._id)[0].quantity;
        if(product.quantity < 0){
          throw new Error('Sorry you are too late, somebody took the last one !');
        }

        observables.push(this.http.put(url + `/${product._id}`, product));
      }

      forkJoin(...observables).subscribe(data => {
        for (let product of data as Product[]) {
          this.store.dispatch(new EditProduct(product));
        }
      })
    })
  }

}
