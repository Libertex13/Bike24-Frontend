export interface Product {
  id: string;
  productName: string;
  maxAmount: number;
  taxRate: number;
  price: number;
  quantity?: number;
}

export interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  products: Product[];
}
