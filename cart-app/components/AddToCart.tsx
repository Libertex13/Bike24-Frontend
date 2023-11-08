import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CartContext } from "../contexts/CartContext";
import { Product } from "@/types/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddToCart() {
  const { products, addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);

      const updatedProduct =
        products.find((p) => p.id === selectedProduct.id) || null;
      setSelectedProduct(updatedProduct);

      setQuantity(1);
    }
  };

  return (
    <div className="mt-12 flex w-full flex-row items-center justify-between gap-4">
      {/* Dropdown Menu  */}
      <Menu as="div" className="relative inline-block text-left ">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                data-testid="product-select-button"
                className="min-w-32 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
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
              <Menu.Items className="min-w-24 absolute z-10 mt-2 max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 ">
                  {products.map((product) => (
                    <Menu.Item key={product.id}>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm",
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
        <div className="flex flex-col items-center space-y-2">
          {/* Slider */}
          <input
            type="range"
            min="1"
            max={selectedProduct.maxAmount}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="slider h-2 w-full appearance-none rounded-full bg-gray-200 focus:border-blue-300 focus:outline-none focus:ring" // Customized slider with Tailwind classes
          />
          {/* Amount Number (updates with slider) x Price = Total Price */}
          <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            {quantity} x ${selectedProduct?.price.toFixed(2) ?? "0.00"} = $
            {(quantity * (selectedProduct?.price ?? 0)).toFixed(2)}
          </span>
        </div>
      ) : (
        <div className="rounded-lg py-2 text-center text-sm text-gray-500">
          Choose a product!
        </div>
      )}

      <div className="p-15 flex-grow flex-row items-center justify-center"></div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
