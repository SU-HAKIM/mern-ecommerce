export interface Product {
  title: string;
  description: string;
  image: string;
  price: string;
  available: string;
  rating?: string;
}
export interface ProductsState {
  products: Product[];
  cart: Product[];
  loading: boolean;
}
