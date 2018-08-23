import {Component, OnDestroy, OnInit} from '@angular/core';
import {sliderAnimations} from '../../shared/app.animations';


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: sliderAnimations
})

export class SliderComponent implements OnInit, OnDestroy{
  isHome: boolean;

  public _images: string[] = ['../../../assets/images/home_slider_1.jpg',
    '../../../assets/images/home_slider_2.jpg',
    '../../../assets/images/home_slider_3.jpg'
  ];
  selectedIndex: number = 0;
  intervalIndex;

  constructor(){
    this.newSlide = this.newSlide.bind(this);
  }

  get images() {
    return [this._images[this.selectedIndex]];
  }

  ngOnInit() {
    this.intervalIndex = setInterval(this.newSlide, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalIndex);
  }

  newSlide() {
    if (this.selectedIndex === this._images.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this._images.length - 1);
    }
  }

  scrollToProducts(e) {
    e.preventDefault();
    window.scrollTo(1400, 1400);
  }

}
