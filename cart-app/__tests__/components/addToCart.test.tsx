import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCart from "../../pages/components/addToCart";
import mockProducts from "../../../data/products.json";

describe("AddToCart", () => {
  it("renders the dropdown button", () => {
    render(<AddToCart />);
    const dropdownButton = screen.getByRole("button", {
      name: "Select a product",
    });
    expect(dropdownButton).toBeInTheDocument();
  });

  it("opens the dropdown menu when the button is clicked", async () => {
    render(<AddToCart />);
    const dropdownButton = screen.getByRole("button", {
      name: "Select a product",
    });
    userEvent.click(dropdownButton);
    const dropdownMenu = await screen.findByRole("menu");
    expect(dropdownMenu).toBeVisible();
  });

  it("displays all the products in the dropdown", () => {
    render(<AddToCart />);
    const dropdownButton = screen.getByRole("button", {
      name: "Select a product",
    });
    userEvent.click(dropdownButton);
    mockProducts.forEach(async (product) => {
      expect(await screen.findByText(product.productName)).toBeInTheDocument();
    });
  });

  it('should enable "Add to Cart" button when a product is selected', async () => {
    render(<AddToCart />);
    const dropdownButton = screen.getByRole("button", {
      name: "Select a product",
    });
    userEvent.click(dropdownButton);

    const productOption = await screen.findByText(mockProducts[0].productName);
    userEvent.click(productOption);

    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    expect(addToCartButton).toBeEnabled();
  });
});
