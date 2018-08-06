import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const appKey = "kid_BJW3zX1Hm";
const url = `https://baas.kinvey.com/appdata/${appKey}/categories`;

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  renderCategories() {
    return this.http.get(url);
  }
}
