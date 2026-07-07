import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import NoDataFount from "../../components/card/NoDataFount";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import ListLoading from "../../components/loader/ListLoading";
import DeleteUserModal from "../../components/user/DeleteUserModal";
import UserFormModal from "../../components/user/UserFormModal";
import PrimaryButton from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import { getUserInfo } from "../../helper/SessionHelper";
import { useGetUsersQuery } from "../../redux/features/user/userApi";
import type { IUserAccount } from "../../types/user.type";

const roleBadgeClass: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-700",
  MANAGER: "bg-blue-100 text-blue-700",
  EMPLOYEE: "bg-gray-100 text-gray-700",
};

const UsersPage = () => {
  const currentUser = getUserInfo();

  const [search, setSearch] = useState("");

  const [formModal, setFormModal] = useState<{
    open: boolean;
    user: IUserAccount | null;
  }>({ open: false, user: null });

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    user: IUserAccount | null;
  }>({ open: false, user: null });

  const { data: resData, isLoading, isError } = useGetUsersQuery(undefined);

  if (isLoading) {
    return <ListLoading />;
  }

  if (isError) {
    return <ServerErrorCard />;
  }

  const allUsers: IUserAccount[] = resData?.data || [];
  const searchTerm = search.trim().toLowerCase();
  const users = searchTerm
    ? allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm) ||
          u.email.toLowerCase().includes(searchTerm),
      )
    : allUsers;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Users</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            placeholder="Search by name or email"
            value={search}
            onChange={setSearch}
          />
          <PrimaryButton
            className="!w-auto px-4"
            onClick={() => setFormModal({ open: true, user: null })}
          >
            <Plus size={18} /> Add User
          </PrimaryButton>
        </div>
      </div>

      {users.length === 0 ? (
        <NoDataFount text="No users found" />
      ) : (
        <div className="bg-white rounded-card-radius shadow-card-shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {users.map((user) => {
                const isSelf = user._id === currentUser?.id;
                return (
                  <tr key={user._id}>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.name}
                      {isSelf && (
                        <span className="ml-2 text-xs text-gray-400">
                          (You)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          roleBadgeClass[user.role] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setFormModal({ open: true, user })}
                          className="text-gray-500 hover:text-primary"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => setDeleteModal({ open: true, user })}
                          className="text-gray-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          title={
                            isSelf ? "You cannot delete your own account" : undefined
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {formModal.open && (
        <UserFormModal
          user={formModal.user}
          onClose={() => setFormModal({ open: false, user: null })}
        />
      )}

      {deleteModal.open && deleteModal.user && (
        <DeleteUserModal
          user={deleteModal.user}
          onClose={() => setDeleteModal({ open: false, user: null })}
        />
      )}
    </div>
  );
};

export default UsersPage;
