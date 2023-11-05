import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CartContext } from "../../contexts/CartContext";
import { Product } from "@/types/product";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddToCart() {
  const { products, addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full flex flex-row items-center justify-between mt-12 gap-4">
      {/* Dropdown Menu  */}
      <Menu as="div" className="relative inline-block text-left ">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="inline-flex min-w-32 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {selectedProduct
                  ? selectedProduct.productName
                  : "Select a product"}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 mt-2 w-full max-h-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto">
                <div className="py-1">
                  {products.map((product) => (
                    <Menu.Item key={product.id}>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full text-left px-4 py-2 text-sm"
                          )}
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.productName}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      {/* Amount slider and calculated price display */}
      {selectedProduct ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Slider */}
          <input
            type="range"
            min="1"
            max={selectedProduct.maxAmount}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="slider w-full" // Make sure the slider is full width
          />
          {/* Amount Number (updates with slider) x Price = Total Price */}
          <span className="flex text-sm text-gray-800 justify-center">
            {quantity} x ${selectedProduct?.price.toFixed(2) ?? "0.00"} = $
            {(quantity * (selectedProduct?.price ?? 0)).toFixed(2)}
          </span>
        </div>
      ) : (
        <div>Choose a Product</div>
      )}
      <div className="flex-grow flex-row items-center justify-center p-15"></div>

      {/* Add to Cart Button */}
      <button
        onClick={() => selectedProduct && addToCart(selectedProduct, quantity)}
        className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add to Cart
      </button>
    </div>
  );
}
