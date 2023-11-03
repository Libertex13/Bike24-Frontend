import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";

describe("Home Page", () => {
  it("renders the home page", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Bike 24 - Cart App")).toBeInTheDocument();
  });
});
