import React from "react";
import {
  render,
  screen,
  within,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../pages/index";
import { CartProvider } from "../../contexts/CartContext";
import mockProducts from "../../../data/mockproducts.json";

describe("Home Page Integration", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      }),
    ) as jest.Mock;
  });

  // Reset the mock after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(async () => {
    await act(async () => {
      render(
        <CartProvider>
          <Home />
        </CartProvider>,
      );
    });
  });

  //  Does it add to cart ? //

  it("adds a product to the cart and checks if it appears in the table", async () => {
    // Simulate the user interaction to select a product
    userEvent.click(screen.getByTestId("product-select-button"));
    // Simulate selecting the first product
    const firstProduct = mockProducts[0];
    userEvent.click(await screen.findByText(firstProduct.productName));

    // Add to cart
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    userEvent.click(addToCartButton);

    // Wait for the product to appear in the cart
    await waitFor(() => {
      const table = screen.getByRole("table");
      const withinTable = within(table);

      // Now, use withinTable to check if the text is in the table
      expect(
        withinTable.getByText(`${firstProduct.productName}`),
      ).toBeInTheDocument();
    });
  });

  //  Can it render various products to cart ? //

  it("should show 10 products in the cart", async () => {
    // Render the component with 10 initial items in the cart
    render(
      <CartProvider initialCartItems={mockProducts.slice(0, 10)}>
        <Home />
      </CartProvider>,
    );

    await waitFor(() => {
      mockProducts.slice(0, 10).forEach((product) => {
        expect(screen.getByText(product.productName)).toBeInTheDocument();
      });
    });
  });
});

//  Error Modal 1 //

it("should display an error modal when adding more than the product type limit to the cart", async () => {
  // Render the component with 10 initial items in the cart, they will have no quantity but it's not needed for the test.
  render(
    <CartProvider initialCartItems={mockProducts.slice(0, 10)}>
      <Home />
    </CartProvider>,
  );

  userEvent.click(screen.getByTestId("product-select-button"));

  // Simulate selecting the 11th product
  const firstProduct = mockProducts[11];
  userEvent.click(await screen.findByText(firstProduct.productName));

  // Add to cart
  const addToCartButton = screen.getByRole("button", {
    name: /add to cart/i,
  });
  userEvent.click(addToCartButton);

  // Wait for the errorModal to appear in the page
  await waitFor(() => {
    const errorModal = screen.getByTestId("error-modal");
    expect(errorModal).toBeInTheDocument();
  });
  await waitFor(() => {
    const errorModal = screen.getByText(
      "You can't add more than 10 unique product types!",
    );
    expect(errorModal).toBeInTheDocument();
  });
});

//  Error Modal 2 //

it("displays the correct error when the max amount of a product is surpassed ", async () => {
  render(
    <CartProvider>
      <Home />
    </CartProvider>,
  );

  // Select a product to enable the "Add to Cart" button and show price
  const dropdownButton = screen.getByRole("button", {
    name: /select a product/i,
  });
  userEvent.click(dropdownButton);
  const firstProductButton = await screen.findByText(
    mockProducts[0].productName,
  );
  userEvent.click(firstProductButton);

  // Change the quantity using the slider to the max
  const slider = (await screen.findByRole("slider")) as HTMLInputElement;
  fireEvent.change(slider, {
    target: { value: `${mockProducts[0].maxAmount}` },
  });

  // Add to cart
  const addToCartButton = screen.getByRole("button", {
    name: /add to cart/i,
  });
  userEvent.click(addToCartButton);

  // Add to cart again , therefore surpassing max.

  userEvent.click(addToCartButton);

  await waitFor(() => {
    const errorModal = screen.getByText(
      `You can't add more than ${mockProducts[0].maxAmount} of this product.`,
    );
    expect(errorModal).toBeInTheDocument();
  });
});
