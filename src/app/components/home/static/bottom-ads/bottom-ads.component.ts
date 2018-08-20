import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state/app.state';

@Component({
  selector: 'app-bottom-ads',
  templateUrl: './bottom-ads.component.html',
  styleUrls: ['../advertisements.css']
})
export class BottomAdsComponent implements OnInit {
  headphonesUrl: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(map(state => state.categories.all)).subscribe(categories => {
      if(categories.length > 0){
        this.headphonesUrl = categories.filter(c => c.name === 'Headphones')[0]._id;
      }
    })
  }
}
