import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state/app.state';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-upper-ads',
  templateUrl: './upper-ads.component.html',
  styleUrls: ['../advertisements.css']
})
export class UpperAdsComponent implements OnInit{
  phonesUrl: string;
  camerasUrl: string;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(map(state => state.categories.all)).subscribe(categories => {
      if(categories.length > 0){
        this.phonesUrl = categories.filter(c => c.name === 'Phones')[0]._id;
        this.camerasUrl = categories.filter(c => c.name === 'Cameras')[0]._id;
      }
    })
  }

}
