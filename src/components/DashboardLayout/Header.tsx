import { Briefcase, Crown, User as UserIcon } from "lucide-react";
import React from "react";
// import { logoSVG } from "../../assets/icons/icons";
import logoPicture from "../../assets/erp-logo.png";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks/hooks";
import type { IUserAccount } from "../../types/user.type";
import UserLoading from "../loader/UserLoading";

interface HeaderProps {
  children?: React.ReactNode;
}

const ROLE_AVATAR_COLOR: Record<IUserAccount["role"], string> = {
  ADMIN: "bg-red",
  MANAGER: "bg-blue-500",
  EMPLOYEE: "bg-green-500",
};

const ROLE_ICON: Record<IUserAccount["role"], React.ElementType> = {
  ADMIN: Crown,
  MANAGER: Briefcase,
  EMPLOYEE: UserIcon,
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isLoading, isFetching } = useGetMeQuery(undefined);
  const user = useAppSelector((state) => state.user.user);

  const userData = user;

  const fullName = userData?.name ?? "User";
  const role = userData?.role?.trim().toUpperCase() as IUserAccount["role"];
  const avatarColor = ROLE_AVATAR_COLOR[role] ?? "bg-gray-500";
  const RoleIcon = ROLE_ICON[role] ?? UserIcon;

  console.log("role ", role);
  console.log("RoleIcon ", RoleIcon);

  return (
    <header className="bg-white text-white h-16 flex items-center justify-between px-4 z-10 border-b">
      <div className="flex items-center">
        {children}
        <h1 className="text-lg font-semibold text-gray-900">
          {/* <figure className="my-1">{logoSVG}</figure> */}
          <figure className="my-1">
            <img src={logoPicture} alt="logo" className="h-16" />
          </figure>
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        {isLoading || isFetching ? (
          <UserLoading />
        ) : (
          <div className="flex items-center gap-2 text-black px-2 py-1 rounded-md">
            <div className="flex flex-col items-end leading-tight">
              <h1 className="font-semibold">{fullName}</h1>
              <span className="text-xs text-gray-500">{role}</span>
            </div>
            <div
              title={role}
              className={`size-12 rounded-full flex items-center justify-center text-white ${avatarColor}`}
            >
              <RoleIcon size={22} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
