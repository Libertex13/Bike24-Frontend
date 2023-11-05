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
  const [errorModalMessage, setErrorModalMessage] = useState("");

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
      // Check for product type limit
      if (
        checkProductTypeLimit(prevItems) &&
        !prevItems.some((item) => item.id === product.id)
      ) {
        setErrorModalMessage(
          "You can't add more than 10 unique product types!"
        );
        setProductTypeLimitReached(true);
        return prevItems;
      }

      // Check for maxAmount limit
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (
        existingProduct &&
        (existingProduct.quantity || 0) + quantity > product.maxAmount
      ) {
        setErrorModalMessage(
          `You can't add more than ${product.maxAmount} of this product.`
        );
        setProductTypeLimitReached(true);
        return prevItems;
      }

      setProductTypeLimitReached(false);

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
    setErrorModalMessage("");
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
        message={errorModalMessage}
      />
    </>
  );
}
