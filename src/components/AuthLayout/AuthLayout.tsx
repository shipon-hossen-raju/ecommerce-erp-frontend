import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center md:justify-start md:flex-row bg-gray-50">
        <div className="w-full flex items-center justify-center bg-gray-50 p-3 sm:p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
