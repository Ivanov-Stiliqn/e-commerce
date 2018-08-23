import { Pipe, PipeTransform } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {map} from 'rxjs/internal/operators';
import {getCurrencySign} from '../utilities/currencySing';

@Pipe({
  name: 'currencyTransform'
})

export class CurrencyPipe implements PipeTransform {
  currency: string;
  rate: number;

  constructor(private store: Store<AppState>) {
    this.store.pipe(map(state => state.products)).subscribe(productState => {
      this.currency = productState.currency;
      this.rate = productState.rate;
    })
  }

  transform (value: number) {
    let currencyValue = value * this.rate;
    if(this.currency !== 'USD'){
      currencyValue = Math.ceil(currencyValue);
    }

    if(this.currency === 'BGN'){
      return currencyValue.toFixed(2) + getCurrencySign(this.currency);
    }

    return getCurrencySign(this.currency) + currencyValue.toFixed(2);
  }

}
