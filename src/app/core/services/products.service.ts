import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const appKey = "kid_BJW3zX1Hm";
const url = `https://baas.kinvey.com/appdata/${appKey}/products`;

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  renderProducts() {
    return this.http.get(url);
  }
}
