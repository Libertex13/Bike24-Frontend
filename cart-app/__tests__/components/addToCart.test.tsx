import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCart from "../../pages/components/addToCart";
import mockProducts from "../../../data/products.json";

describe("AddToCart Component", () => {
  it("renders the add to cart button", async () => {
    render(<AddToCart />);
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("renders a dropdown and can select an item", async () => {
    render(<AddToCart />);

    // Click the button to open the dropdown
    const menuButton = screen.getByRole("button", { name: /more/i });
    userEvent.click(menuButton);

    // The list should now be present
    const menuList = screen.getByRole("listbox");
    expect(menuList).toBeVisible();

    // Assuming each product is in a "Menu.Item"
    const productItems = screen.getAllByRole("option");
    expect(productItems.length).toBeGreaterThan(0); // You expect at least one product

    // Click the first product
    userEvent.click(productItems[0]);
  });
});
