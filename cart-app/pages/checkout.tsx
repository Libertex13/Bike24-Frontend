// pages/checkout.tsx

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity ?? 1);
  }, 0);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-5">Checkout</h1>
      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div key={item.id} className="py-4 flex justify-between items-center">
            <span>
              {item.productName} (x{item.quantity})
            </span>
            <span>${(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Checkout;
