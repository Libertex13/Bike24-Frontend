//cart-app\__tests__\components\addToCart.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../../contexts/CartContext";
import AddToCart from "@/components/addToCart";
import mockProducts from "../../../data/products.json";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProducts),
  }),
) as jest.Mock;

describe("AddToCart", () => {
  let consoleSpy: jest.SpyInstance;
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("initializes with the default state", async () => {
    render(
      <CartProvider>
        <AddToCart />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Select a product")).toBeInTheDocument();
    });
  });

  it("updates selectedProduct when a product is selected", async () => {
    render(
      <CartProvider>
        <AddToCart />
      </CartProvider>,
    );

    // Click the dropdown to show the product list
    const dropdownButton = screen.getByRole("button", {
      name: /select a product/i,
    });
    userEvent.click(dropdownButton);

    // Wait for the product list to be populated
    const firstProductButton = await screen.findByText(
      mockProducts[0].productName,
    );
    userEvent.click(firstProductButton);

    await waitFor(() => {
      expect(screen.getByText(mockProducts[0].productName)).toBeInTheDocument();
    });
  });

  it("updates quantity when the slider is changed", async () => {
    render(
      <CartProvider>
        <AddToCart />
      </CartProvider>,
    );

    // Select a product to make the slider visible
    const dropdownButton = screen.getByRole("button", {
      name: /select a product/i,
    });
    userEvent.click(dropdownButton);
    const firstProductButton = await screen.findByText(
      mockProducts[0].productName,
    );
    userEvent.click(firstProductButton);

    // Adjust the slider
    const slider = (await screen.findByRole("slider")) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "3" } });

    await waitFor(() => {
      expect(slider.value).toBe("3");
    });
  });

  it("displays the correct total price when quantity is changed", async () => {
    render(
      <CartProvider>
        <AddToCart />
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

    // Change the quantity using the slider
    const slider = (await screen.findByRole("slider")) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "3" } });

    await waitFor(() => {
      // Check if the total price displayed is correct
      const totalPriceElement = screen.getByText(
        (content) => content.includes(`${3 * mockProducts[0].price}`),
        { exact: false }, // We use { exact: false } because we're looking for a part of the string, not the whole content
      );
      expect(totalPriceElement).toBeInTheDocument();
    });
  });
});
