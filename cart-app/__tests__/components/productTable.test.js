import { render, screen } from "@testing-library/react";
import ProductTable from "../../pages/components/productTable";

describe("ProductTable Component", () => {
  it("renders the table with headers", () => {
    render(<ProductTable />);
    // Check for column headers
    expect(screen.getByText("Product Name")).toBeInTheDocument();
    expect(screen.getByText("Unit Price")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });
});
