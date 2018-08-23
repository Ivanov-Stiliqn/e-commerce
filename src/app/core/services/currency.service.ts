import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {ChangeProductsCurrency} from '../../store/actions/products.actions';

const url = 'https://openexchangerates.org/api/latest.json?app_id=';
const appKey = '4669151d9822419da48b60b2b4f2dfd8';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  changeCurrency(currency) {
    return this.http.get(url + appKey)
      .pipe(map(data => {
        let rate = data['rates'][currency];
        let payload = {
          currency,
          rate
        };

        this.store.dispatch(new ChangeProductsCurrency(payload));
      }))
  }
}
