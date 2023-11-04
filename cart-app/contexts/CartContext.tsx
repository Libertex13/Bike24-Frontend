import { Product, CartContextType } from "@/types/product";
import { createContext, useState, useEffect, ReactNode } from "react";

const defaultState: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  products: [],
};

export const CartContext = createContext<CartContextType>(defaultState);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {};

  const removeFromCart = (productId: string) => {};

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, products }}
    >
      {children}
    </CartContext.Provider>
  );
}
