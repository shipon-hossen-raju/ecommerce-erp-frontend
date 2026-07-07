import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import { userAccountSchema } from "../../schemas/userAccount.schema";
import type { IUserAccount } from "../../types/user.type";
import CustomInput from "../form/CustomInput";
import CustomSelect from "../form/CustomSelect";
import PrimaryButton from "../ui/Button";

type TFormValues = z.infer<typeof userAccountSchema>;

type TProps = {
  user: IUserAccount | null;
  onClose: () => void;
};

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Manager", value: "MANAGER" },
  { label: "Employee", value: "EMPLOYEE" },
];

const UserFormModal = ({ user, onClose }: TProps) => {
  const isEdit = !!user;
  const [passwordError, setPasswordError] = useState(false);

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const { handleSubmit, control } = useForm<TFormValues>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "EMPLOYEE",
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    if (!isEdit && !data.password) {
      setPasswordError(true);
      return;
    }

    try {
      if (isEdit && user) {
        await updateUser({
          id: user._id,
          data: {
            name: data.name,
            role: data.role,
            ...(data.password ? { password: data.password } : {}),
          },
        }).unwrap();
      } else {
        await createUser({
          name: data.name,
          email: data.email,
          password: data.password as string,
          role: data.role,
        }).unwrap();
      }
      onClose();
    } catch {
      // failure toast already handled in userApi.onQueryStarted
    }
  };

  return (
    <Modal
      open
      title={isEdit ? "Edit User" : "Add User"}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <CustomInput
          label="Name"
          name="name"
          control={control}
          placeholder="Enter full name"
        />
        <CustomInput
          label="Email"
          name="email"
          type="email"
          control={control}
          placeholder="Enter email"
          disabled={isEdit}
        />
        <div>
          <CustomInput
            label={isEdit ? "New Password (optional)" : "Password"}
            name="password"
            type="password"
            control={control}
            placeholder={
              isEdit ? "Leave blank to keep current password" : "Enter password"
            }
            onInput={() => setPasswordError(false)}
          />
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">Password is required</p>
          )}
        </div>
        <CustomSelect
          label="Role"
          name="role"
          control={control}
          options={roleOptions}
          showSearch={false}
        />

        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isCreating || isUpdating}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            className="!w-full"
          >
            {isEdit ? "Update User" : "Create User"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
