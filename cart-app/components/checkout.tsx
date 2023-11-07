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
                    className="m- absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <div className="container rounded-lg bg-white p-6">
                    <h1 className="mb-8 text-3xl font-bold text-indigo-600">
                      Checkout
                    </h1>
                    <div className="max-h-64 overflow-y-auto rounded-md border border-indigo-500 p-6">
                      {/* Scrollable cart items */}
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-4 text-gray-700"
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
                    <div className="mt-8 flex items-center justify-between rounded-md bg-indigo-100 p-4">
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
