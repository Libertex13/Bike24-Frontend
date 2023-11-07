//cart-app\types\types.ts
import { ReactNode } from "react";

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
  clearCart: () => void;
  products: Product[];
  isProductTypeLimitReached: boolean;
}

export interface ErrorModalProps {
  isOpen: boolean;
  close: () => void;
  message: string;
}

export interface CartProviderProps {
  children: ReactNode;
  initialCartItems?: Product[]; // Optional prop to pre-populate the cart
}

export interface CheckoutProps {
  isOpen: boolean;
  closeModal: () => void;
}
