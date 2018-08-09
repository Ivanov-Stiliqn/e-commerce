import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomAdsComponent } from './bottom-ads.component';

describe('BottomAdsComponent', () => {
  let component: BottomAdsComponent;
  let fixture: ComponentFixture<BottomAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
