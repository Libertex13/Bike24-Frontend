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

  return (
    <div className="flex flex-col h-[500px] overflow-hidden rounded-lg border border-indigo-600">
      {/* Table with a flex-grow to take up all available space */}
      <div className="flex-grow overflow-x-auto overflow-y-auto">
        {" "}
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0 z-5">
            <tr>
              <th
                scope="col"
                className="px-5 py-3 bg-indigo-100 border-b border-indigo-200 text-gray-800 text-left text-sm uppercase font-semibold rounded-tl-lg"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-indigo-100 border-b border-indigo-200 text-gray-800 text-left text-sm uppercase font-semibold"
              >
                Unit Price
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-indigo-100 border-b border-indigo-200 text-gray-800 text-left text-sm uppercase font-semibold"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-5 py-3 bg-indigo-100 border-b border-indigo-200 text-gray-800 text-left text-sm uppercase font-semibold "
              >
                Total Price
              </th>
              <th
                scope="col"
                className="px-2 py-3 flex justify-center border-b  border-indigo-200 text-sm uppercase font-semibold  bg-red-300"
              >
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 flex justify-center uppercase "
                >
                  Delete All
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                  <p className="text-gray-900 whitespace-no-wrap">
                    ${item.price}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {item.quantity}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    $
                    {item.quantity
                      ? (item.quantity * item.price).toFixed(2)
                      : item.price.toFixed(2)}
                  </p>
                </td>
                <td className="px-5 py-5  border-gray-200 bg-white border-b text-sm flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 flex justify-center"
                    data-testid={`remove-item-${item.id}`}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" sticky bottom-0 z-5  mt-4 p-5 bg-indigo-100 border-t border-indigo-200 text-gray-800 flex justify-end">
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
