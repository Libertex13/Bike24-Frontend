import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ProductTable() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity ?? 1),
      0,
    );
  };

  const EmptyCartPlaceholder = () => (
    <tr>
      <td colSpan={5} className="items-center justify-center py-10">
        <div className="text-center text-indigo-500 ">Cart is empty</div>
      </td>
    </tr>
  );

  return (
    <div className="flex h-[500px] flex-col overflow-hidden rounded-lg border border-indigo-600">
      {/* Table with a flex-grow to take up all available space */}
      <div className="flex-grow overflow-x-auto overflow-y-auto">
        <table className="min-w-full leading-normal" data-testid="cart-table">
          <thead className="z-7 sticky top-0 bg-indigo-600 text-white">
            <tr>
              <th
                scope="col"
                className="rounded-tl-lg border-b border-indigo-500 px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="border-b border-indigo-500 px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white"
              >
                Unit Price
              </th>
              <th
                scope="col"
                className="border-b border-indigo-500 px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white"
              >
                Amount
              </th>
              <th
                scope="col"
                className="border-b border-indigo-500 px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white"
              >
                Total Price
              </th>
              <th
                scope="col"
                className="border-b border-indigo-500 bg-red-400 px-5 py-3 text-sm font-semibold hover:bg-red-500"
              >
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="uppercase tracking-wider text-white"
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
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="whitespace-no-wrap font-medium text-gray-900">
                          {item.productName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap font-medium text-gray-800">
                      ${item.price}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap font-medium text-gray-800">
                      {item.quantity} / {item.maxAmount}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap font-medium text-gray-800">
                      $
                      {item.quantity
                        ? (item.quantity * item.price).toFixed(2)
                        : item.price.toFixed(2)}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
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
      <div className="z-5 sticky bottom-0 flex justify-end bg-indigo-600 p-5 text-white">
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
