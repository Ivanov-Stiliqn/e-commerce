export interface Product {
  _id: string,
  name: string,
  category: string,
  image: string,
  description: string,
  details: string,
  price: number,
  discount?: number,
}
