import { Crown, Plus, User, UserCog } from "lucide-react";
import { useState } from "react";
import NoDataFount from "../../components/card/NoDataFount";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import ListLoading from "../../components/loader/ListLoading";
import SaleFormModal from "../../components/sale/SaleFormModal";
import PrimaryButton from "../../components/ui/Button";
import { getUserInfo } from "../../helper/SessionHelper";
import { useGetSalesQuery } from "../../redux/features/sale/saleApi";
import type { ISale } from "../../types/sale.type";

const roleIcon: Record<string, typeof Crown> = {
  ADMIN: Crown,
  MANAGER: UserCog,
  EMPLOYEE: User,
};

const SalesPage = () => {
  const user = getUserInfo();
  const canView = user?.role === "ADMIN" || user?.role === "MANAGER";

  const [formOpen, setFormOpen] = useState(false);

  const {
    data: resData,
    isLoading,
    isError,
  } = useGetSalesQuery(undefined, { skip: !canView });

  const sales: ISale[] = resData?.data || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Sales</h1>
        </div>
        <div>
          <PrimaryButton
            className="!w-auto px-4"
            onClick={() => setFormOpen(true)}
          >
            <Plus size={18} /> Add Sale
          </PrimaryButton>
        </div>
      </div>

      {!canView ? (
        <NoDataFount text="You don't have permission to view the sales history. Use 'Add Sale' to record a new sale." />
      ) : isLoading ? (
        <ListLoading />
      ) : isError ? (
        <ServerErrorCard />
      ) : sales.length === 0 ? (
        <NoDataFount text="No sales found" />
      ) : (
        <div className="bg-white rounded-card-radius shadow-card-shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Sold By</th>
                <th className="px-4 py-3">Grand Total</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {sales.map((sale) => (
                <tr
                  key={sale._id}
                  className="hover:bg-gray-100 transition-all duration-150 ease-in-out"
                >
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {sale.items.map((item, idx) => (
                        <li key={idx} className="text-gray-700">
                          {item.productName} × {item.quantity} ={" "}
                          {item.subtotal.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center gap-1.5">
                      {sale.soldBy?.role &&
                        (() => {
                          const RoleIcon = roleIcon[sale.soldBy.role];
                          return RoleIcon ? (
                            <RoleIcon size={14} className="text-gray-500" />
                          ) : null;
                        })()}

                      <span>{sale.soldBy?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {sale.grandTotal.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(sale.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && <SaleFormModal onClose={() => setFormOpen(false)} />}
    </div>
  );
};

export default SalesPage;
