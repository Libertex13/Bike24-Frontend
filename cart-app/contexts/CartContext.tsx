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

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex > -1) {
        // Copy the current cart items
        const newCartItems = [...prevItems];
        // Update the quantity of the existing item
        newCartItems[itemIndex] = {
          ...newCartItems[itemIndex],
          quantity: (newCartItems[itemIndex].quantity || 0) + quantity,
        };
        return newCartItems;
      } else {
        // Add the new item with the initial quantity
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const newCartItems = prevItems.filter((item) => item.id !== productId);
      return newCartItems;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, products }}
    >
      {children}
    </CartContext.Provider>
  );
}
