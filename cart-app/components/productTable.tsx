import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ProductTable() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity ?? 1),
      0
    );
  };

  const EmptyCartPlaceholder = () => (
    <tr>
      <td colSpan={5} className="items-center justify-center py-10">
        <div className="text-indigo-500 text-center ">Cart is empty</div>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col h-[500px] overflow-hidden rounded-lg border border-indigo-600">
      {/* Table with a flex-grow to take up all available space */}
      <div className="flex-grow overflow-x-auto overflow-y-auto">
        <table className="min-w-full leading-normal" data-testid="cart-table">
          <thead className="sticky top-0 z-7 bg-indigo-600 text-white">
            <tr>
              <th
                scope="col"
                className="px-5 py-3 border-b border-indigo-500 text-left text-sm font-semibold text-white uppercase tracking-wider rounded-tl-lg"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b border-indigo-500 text-left text-sm font-semibold text-white uppercase tracking-wider"
              >
                Unit Price
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b border-indigo-500 text-left text-sm font-semibold text-white uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b border-indigo-500 text-left text-sm font-semibold text-white uppercase tracking-wider"
              >
                Total Price
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b border-indigo-500 bg-red-400 hover:bg-red-500 text-sm font-semibold"
              >
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-white uppercase tracking-wider"
                  >
                    Delete All
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          {item.productName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 whitespace-no-wrap font-medium">
                      ${item.price}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 whitespace-no-wrap font-medium">
                      {item.quantity} / {item.maxAmount}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 whitespace-no-wrap font-medium">
                      $
                      {item.quantity
                        ? (item.quantity * item.price).toFixed(2)
                        : item.price.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyCartPlaceholder />
            )}
          </tbody>
        </table>
      </div>
      <div className="sticky bottom-0 z-5 p-5 bg-indigo-600 text-white flex justify-end">
        <div>
          <span className="text-right font-semibold">Total Cart Price: </span>
          <span className="text-right font-semibold">
            ${calculateTotalPrice().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
