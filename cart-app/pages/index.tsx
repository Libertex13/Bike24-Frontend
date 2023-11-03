import AddToCart from "./components/addToCart";
import ProductTable from "./components/productTable";
import Buy from "./components/buy";

export default function Home() {
  return (
    <>
      <h1>Bike 24 - Cart App</h1>
      <AddToCart />
      <ProductTable />
      <Buy />
    </>
  );
}
