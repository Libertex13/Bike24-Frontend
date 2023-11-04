import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "@/pages/components/productTable";
import { CartContext } from "../../contexts/CartContext";

// Mock cart items
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

type MockCartProviderProps = {
  children: ReactNode;
};

const MockCartProvider = ({ children }: MockCartProviderProps): JSX.Element => (
  <CartContext.Provider
    value={{
      cartItems: mockCartItems,
      addToCart: jest.fn(),
      removeFromCart: mockRemoveFromCart,
      products: [],
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
      </MockCartProvider>
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
    // You should find the total price element more specifically, perhaps by using a test-id or role
    const totalPriceElement = screen.getByText("$11.94"); // Assuming there's only one total price element
    expect(totalPriceElement).toBeInTheDocument();
  });

  it("calls removeFromCart when the delete button is clicked", () => {
    // Define the expected item ID based on your test setup
    const expectedItemId = mockCartItems[0].id; // Replace with actual expected ID or setup

    // Now use this ID to find the delete button for the first item
    const deleteButton = screen.getByTestId(`remove-item-${expectedItemId}`);
    fireEvent.click(deleteButton);

    // Expect the removeFromCart method to be called with the first item's id
    expect(mockRemoveFromCart).toHaveBeenCalledWith(expectedItemId);
  });
});
