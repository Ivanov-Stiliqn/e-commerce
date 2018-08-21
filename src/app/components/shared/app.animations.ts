import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const productsAnimations =
  [
    trigger('listProducts', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),])
  ];

export const sliderAnimations = [
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
];

export const categoriesAnimations = [
  trigger('listCategories', [
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(300)
    ]),])
];
