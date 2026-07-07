import { Modal } from "antd";
import { useDeleteUserMutation } from "../../redux/features/user/userApi";
import type { IUserAccount } from "../../types/user.type";
import PrimaryButton from "../ui/Button";

type TProps = {
  user: IUserAccount;
  onClose: () => void;
};

const DeleteUserModal = ({ user, onClose }: TProps) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(user._id).unwrap();
      onClose();
    } catch {
      // failure toast already handled in userApi.onQueryStarted
    }
  };

  return (
    <Modal
      open
      title="Delete User"
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <p className="text-gray-600 my-4">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{user.name}</span>? This action
        cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <PrimaryButton
          onClick={handleDelete}
          isLoading={isLoading}
          loadingText="Deleting..."
          className="!w-auto px-4 bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600"
        >
          Delete
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
