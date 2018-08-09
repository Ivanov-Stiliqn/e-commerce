export interface Product {
  _id: string,
  name: string,
  category: string,
  image: string,
  images: string[],
  description: string,
  details: string,
  price: number,
  quantity: number,
  discount?: number,
}
