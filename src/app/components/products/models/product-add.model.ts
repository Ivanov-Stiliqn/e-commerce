export class ProductAddModel{
  constructor( public name: string,
               public category: string,
               public image: string,
               public images: string[],
               public description: string,
               public details: string,
               public price: number,
               public quantity: number,
               public discount?: number) {
  }
}
