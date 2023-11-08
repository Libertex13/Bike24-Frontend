import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "@/components/ProductTable";
import { CartContext } from "../../contexts/CartContext";

const mockCartItems = [
  {
    id: "3ab4c6bc-8920-11ec-a5e9-939419c56813",
    productName: "Cup",
    maxAmount: 100,
    taxRate: 19,
    price: 1.99,
  },
  {
    id: "2fdc8b4e-8920-11ec-aadd-cbe09129765b",
    productName: "T-Shirt",
    maxAmount: 2,
    taxRate: 19,
    price: 9.95,
  },
];

const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();

type MockCartProviderProps = {
  children: ReactNode;
};

const MockCartProvider = ({ children }: MockCartProviderProps): JSX.Element => (
  <CartContext.Provider
    value={{
      cartItems: mockCartItems,
      addToCart: jest.fn(),
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
      products: [],
      isProductTypeLimitReached: false,
    }}
  >
    {children}
  </CartContext.Provider>
);

describe("ProductTable", () => {
  beforeEach(() => {
    render(
      <MockCartProvider>
        <ProductTable />
      </MockCartProvider>,
    );
  });

  it("renders cart items and calculates total price correctly", () => {
    // Check if product names are in the document
    expect(screen.getByText("Cup")).toBeInTheDocument();
    expect(screen.getByText("T-Shirt")).toBeInTheDocument();

    // Check if unit prices are in the document
    const unitPrices = screen.getAllByText("$1.99"); // This will get all instances of "$1.99"
    expect(unitPrices.length).toBeGreaterThan(0); // Check there's at least one instance
    expect(unitPrices[0]).toBeInTheDocument(); // Optionally check the first instance is in the document

    const tShirtPrices = screen.getAllByText("$9.95");
    expect(tShirtPrices.length).toBeGreaterThan(0);
    expect(tShirtPrices[0]).toBeInTheDocument();

    // Check if total price is calculated and rendered correctly
    const totalPriceElement = screen.getByText("$11.94");
    expect(totalPriceElement).toBeInTheDocument();
  });

  it("calls removeFromCart when the delete button is clicked", () => {
    const expectedItemId = mockCartItems[0].id;

    const deleteButton = screen.getByTestId(`remove-item-${expectedItemId}`);
    fireEvent.click(deleteButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(expectedItemId);
  });
});
