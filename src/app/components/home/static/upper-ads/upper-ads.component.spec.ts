import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperAdsComponent } from './upper-ads.component';

describe('UpperAdsComponent', () => {
  let component: UpperAdsComponent;
  let fixture: ComponentFixture<UpperAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
