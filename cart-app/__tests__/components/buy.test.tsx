import { render, fireEvent, screen } from "@testing-library/react";
import Buy from "@/components/Buy";
import { CartContext } from "../../contexts/CartContext";
import { Product, CartContextType } from "@/types/types";

const mockClearCart = jest.fn();
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockCartItems: Product[] = [
  {
    id: "1",
    productName: "Product 1",
    maxAmount: 5,
    taxRate: 0.2,
    price: 10,
    quantity: 1,
  },
  {
    id: "2",
    productName: "Product 2",
    maxAmount: 3,
    taxRate: 0.15,
    price: 15,
    quantity: 2,
  },
];

const mockProducts: Product[] = [
  {
    id: "1",
    productName: "Product 1",
    maxAmount: 5,
    taxRate: 0.2,
    price: 10,
    quantity: 1,
  },
  {
    id: "2",
    productName: "Product 2",
    maxAmount: 3,
    taxRate: 0.15,
    price: 15,
    quantity: 2,
  },
];

const mockContextValue: CartContextType = {
  cartItems: mockCartItems,
  addToCart: mockAddToCart,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
  products: mockProducts,
  isProductTypeLimitReached: false,
};

describe("<Buy />", () => {
  it("renders without crashing", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <Buy />
      </CartContext.Provider>,
    );

    expect(screen.getByText(/Clear Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Buy/i)).toBeInTheDocument();
  });

  it('calls clearCart when "Clear Cart" button is clicked', () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <Buy />
      </CartContext.Provider>,
    );

    fireEvent.click(screen.getByText(/Clear Cart/i));
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it("displays the correct progress bar width based on unique product types", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <Buy />
      </CartContext.Provider>,
    );

    // Calculate expected width based on unique product types
    const uniqueProductTypes = new Set(mockCartItems.map((item) => item.id))
      .size;
    const expectedWidth = `${(uniqueProductTypes / 10) * 100}%`;

    // Find the progress bar using the test ID and check its width style
    const progressBar = screen.getByTestId("progress-bar").firstChild;
    expect(progressBar).toHaveStyle(`width: ${expectedWidth}`);
  });
});
