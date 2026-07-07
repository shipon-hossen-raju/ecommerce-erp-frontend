import LoginForm from "../../components/auth/LoginForm";
import { useAppSelector } from "../../redux/hooks/hooks";

const LoginPage = () => {
  const user = useAppSelector((state) => state.user.user);

  if (user) {
    window.location.href = "/";
  }

  return (
    <>
      <div className="w-full max-w-lg bg-white py-6 lg:py-24 px-4 md:px-10 shadow-[0px_18px_48px_0px_#CFC9DDB2] rounded-md">
        <h2 className="text-3xl md:text-3xl font-bold mb-6 text-title text-center">
          Welcome Back !
        </h2>
        <p className="text-ebony_black mb-6 text-center">
          Please enter your email and password to continue
        </p>
        {/* Login Form */}
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
