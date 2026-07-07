import NoDataFount from "../card/NoDataFount";
import type { IProduct } from "../../types/product.type";

const LowStockTable = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="bg-white rounded-card-radius shadow-card-shadow overflow-hidden">
      <p className="text-sm font-medium text-gray-600 px-6 pt-6 pb-4">
        Low Stock Products
      </p>

      {products.length === 0 ? (
        <div className="px-6 pb-6">
          <NoDataFount text="No low stock products" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {products.map((product) => (
                <tr key={product._id} className="bg-red-50">
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-3">{product.sku}</td>
                  <td className="px-6 py-3">{product.category}</td>
                  <td className="px-6 py-3 text-red font-medium tabular-nums">
                    {product.stockQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LowStockTable;
