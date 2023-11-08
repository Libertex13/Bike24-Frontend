// cart-app/pages/components/buy.tsx
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import Checkout from "./Checkout";

export default function Buy() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const uniqueProductTypes = Array.from(
    new Set(cartItems.map((item) => item.id)),
  ).length;

  const handleBuy = () => {
    setIsCheckoutOpen(true); // Open the Checkout modal
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false); // Close the Checkout modal
  };

  return (
    <>
      <div className="flex items-center justify-between border-t p-4">
        <button
          onClick={clearCart}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        >
          Clear Cart
        </button>
        <div
          className="m-5 h-2.5 w-56 rounded-full bg-gray-200 dark:bg-gray-700"
          data-testid="progress-bar"
        >
          <div
            className="h-2.5 rounded-full bg-blue-600 "
            style={{ width: `${(uniqueProductTypes / 10) * 100}%` }}
          ></div>
          <p className="flex justify-center">{uniqueProductTypes}/10</p>
        </div>
        <button
          onClick={handleBuy}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
        >
          Buy Items
        </button>
      </div>
      {isCheckoutOpen && (
        <Checkout isOpen={isCheckoutOpen} closeModal={closeCheckout} />
      )}
    </>
  );
}
