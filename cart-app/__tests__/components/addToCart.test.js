import { render, screen } from "@testing-library/react";
import AddToCart from "../../pages/components/addToCart";

describe("AddToCart Component", () => {
  it("renders the add to cart button", () => {
    render(<AddToCart />);
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });
});
