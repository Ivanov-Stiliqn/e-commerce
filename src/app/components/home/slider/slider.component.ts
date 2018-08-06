import {Component} from '@angular/core';
import {
  trigger,
  animate,
  transition,
  style,
  group,
  query
} from '@angular/animations';


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('slider', [
      transition(':increment', group([
        query(':enter', [
          style({
            left: '100%'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            left: '-100%'
          }))
        ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            left: '100%'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            left: '-100%'
          }))
        ])
      ])),
    ])
  ]
})

export class SliderComponent {
  isHome: boolean;

  public _images: string[] = ['http://trademarkradio.nl/wp-content/uploads/2014/03/Headphones-Cool-HD-Wallpapers.jpg',
    '../../../assets/images/home_slider_1.jpg',
    'http://1.bp.blogspot.com/-1gqsZ4NVldk/Tv6rIpYiiVI/AAAAAAAABBc/aB95EJ8M-HA/s1600/Laptop-Wallpapers-01.jpg'
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
    console.log(this.selectedIndex);
    if (this.selectedIndex === this._images.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this._images.length - 1);
    }
  }

}
