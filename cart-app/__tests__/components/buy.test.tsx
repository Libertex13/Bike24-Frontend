import { render, screen } from "@testing-library/react";
import Buy from "../../pages/components/buy";
describe("Buy Component", () => {
  it("renders the clear cart button", () => {
    render(<Buy />);
    const clearCartButton = screen.getByRole("button", { name: /clear cart/i });
    expect(clearCartButton).toBeInTheDocument();
  });

  it("renders the buy button", () => {
    render(<Buy />);
    const buyButton = screen.getByRole("button", { name: /buy/i });
    expect(buyButton).toBeInTheDocument();
  });
});
