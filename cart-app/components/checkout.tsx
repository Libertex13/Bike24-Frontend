// components/checkout.tsx

import { useContext, Fragment } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CheckoutProps } from "@/types/types";

const Checkout = ({ isOpen, closeModal }: CheckoutProps) => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity ?? 1);
  }, 0);

  return (
    <>
      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Close button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-5 right-5 m- text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <div className="container p-6 bg-white rounded-lg">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                      Checkout
                    </h1>
                    <div className="max-h-64 overflow-y-auto p-6 border border-indigo-500 rounded-md">
                      {/* Scrollable cart items */}
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="py-4 flex justify-between items-center text-gray-700"
                        >
                          <span className="text-lg font-medium">
                            {item.productName}{" "}
                            <span className="text-indigo-500">
                              (x{item.quantity})
                            </span>
                          </span>
                          <span className="font-semibold">
                            ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {cartItems.length === 0 && (
                        <div className="py-4 text-center text-gray-700">
                          <p>No items in the cart.</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-8 p-4 bg-indigo-100 rounded-md flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-700">
                        Total:
                      </span>
                      <strong className="text-xl font-bold text-indigo-600">
                        ${totalPrice.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Checkout;
