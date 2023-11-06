// cart-app/pages/components/buy.tsx
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import Checkout from "./checkout";

export default function Buy() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const uniqueProductTypes = Array.from(
    new Set(cartItems.map((item) => item.id))
  ).length;

  const handleBuy = () => {
    setIsCheckoutOpen(true); // Open the Checkout modal
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false); // Close the Checkout modal
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 border-t">
        <button
          onClick={clearCart}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
        >
          Clear Cart
        </button>
        <div
          className="w-56 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 m-5"
          data-testid="progress-bar"
        >
          <div
            className="bg-blue-600 h-2.5 rounded-full "
            style={{ width: `${(uniqueProductTypes / 10) * 100}%` }}
          ></div>
          <p className="flex justify-center">{uniqueProductTypes}/10</p>
        </div>
        <button
          onClick={handleBuy}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700"
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
