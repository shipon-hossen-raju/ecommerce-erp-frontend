import React from "react";
import { defaultImages } from "../../assets";
// import { logoSVG } from "../../assets/icons/icons";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks/hooks";
import type { IUser } from "../../types/user.type";
import UserLoading from "../loader/UserLoading";
import logoPicture from "../../assets/erp-logo.png";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isLoading, isFetching } = useGetMeQuery(undefined);
  const user = useAppSelector((state) => state.user.user);

  const userData: IUser = user as IUser;

  const fullName = `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`;
  const profileImage = userData?.profileImage ?? defaultImages.profile;

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
            <h1 className="font-semibold"> {fullName} </h1>
            <img
              src={profileImage}
              alt={fullName}
              className="size-12 rounded-full"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
