import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ProductTable() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity ?? 1),
      0
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Unit Price
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Total Price
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
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
              <td className="px-5 py-5  border-gray-200 bg-white text-sm">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                  data-testid={`remove-item-${item.id}`}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={5}
              className="text-right px-5 py-5 border-t border-gray-200 bg-white text-sm"
            >
              Total Cart Price
            </td>
            <td className="px-5 py-5 border-t border-gray-200 bg-white text-sm">
              <p>${calculateTotalPrice().toFixed(2)}</p>
            </td>
            <td className="border-t border-gray-200 bg-white"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
