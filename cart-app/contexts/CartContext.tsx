import { Product, CartContextType } from "@/types/types";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

import { ErrorModal } from "@/components/ErrorModal";

const defaultState: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  products: [],
  isProductTypeLimitReached: false,
};

export const CartContext = createContext<CartContextType>(defaultState);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductTypeLimitReached, setProductTypeLimitReached] =
    useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const checkProductTypeLimit = useCallback((currentCartItems: Product[]) => {
    const uniqueProductTypes = new Set(currentCartItems.map((item) => item.id))
      .size;
    return uniqueProductTypes >= 10;
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      if (
        checkProductTypeLimit(prevItems) &&
        !prevItems.some((item) => item.id === product.id)
      ) {
        // If the limit has been reached and the product isn't already in the cart
        setProductTypeLimitReached(true); // Update state to reflect the limit has been reached
        return prevItems; // Return the current items without adding a new product type
      }

      // Proceed as normal if the limit hasn't been reached
      setProductTypeLimitReached(false); // Reset the limit reached state

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

  const clearCart = () => {
    setCartItems([]);
  };

  const closeModal = () => {
    setProductTypeLimitReached(false);
  };

  return (
    <>
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          clearCart,
          products,
          isProductTypeLimitReached,
        }}
      >
        {children}
      </CartContext.Provider>
      <ErrorModal
        data-testid="error-modal"
        isOpen={isProductTypeLimitReached}
        close={closeModal}
        message="You can't add more than 10 unique product types!"
      />
    </>
  );
}
