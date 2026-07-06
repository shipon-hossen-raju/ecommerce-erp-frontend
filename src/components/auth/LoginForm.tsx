import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { SetLoginError } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { loginSchema } from "../../schemas/auth.schema";
import CustomCheckbox from "../form/CustomCheckbox";
import CustomInput from "../form/CustomInput";
import PrimaryButton from "../ui/Button";
import Error from "../validation/Error";

type TFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "Admin@123",
      // remember: false,
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    dispatch(SetLoginError(""));
    await login({
      email: data.email,
      password: data.password,
      // isRemember: data.remember,
    });
  };

  return (
    <>
      {LoginError && <Error message={LoginError} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <CustomInput
            label="Email"
            name="email"
            type="text"
            control={control}
            placeholder="Enter email address"
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            control={control}
            placeholder="Enter your password"
          />
          <CustomCheckbox
            name="remember"
            label="Remember me"
            control={control}
          />
        </div>

        <div className="mt-10">
          <PrimaryButton
            isLoading={isLoading}
            type="submit"
            loadingText="Signing..."
          >
            Signin
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
