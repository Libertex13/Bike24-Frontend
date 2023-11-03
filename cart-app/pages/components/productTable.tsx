// cart-app/components/ProductTable.tsx

export default function ProductTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Unit Price
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>{/* Rows will go here */}</tbody>
      </table>
    </div>
  );
}
