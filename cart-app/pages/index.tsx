import AddToCart from "@/components/AddToCart";
import ProductTable from "../components/ProductTable";
import Buy from "../components/Buy";

export default function Home() {
  return (
    <main className="h-full p-[5%]">
      <h1 className="font-semibold">Bike 24 - Cart App</h1>
      <div className="flex flex-col justify-center gap-8">
        {/* component with product choice , quantity slider and price */}
        <AddToCart />
        {/* Table with all products/quantity chosen , unit price and total price */}
        <ProductTable />
        {/* Clear Cart, Progress Bar (max 10) and Buy button*/}
        <Buy />
      </div>
    </main>
  );
}
