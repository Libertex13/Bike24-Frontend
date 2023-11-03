// __tests__/pages/index.test.js
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});
