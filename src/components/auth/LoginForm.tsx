import { zodResolver } from "@hookform/resolvers/zod";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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

type TErrorResponse = {
  message?: string;
  errorSources?: { path?: string; message: string }[];
};

const FORM_FIELDS = ["email", "password"] as const;

const LoginForm = () => {
  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { handleSubmit, control, setError } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "Admin@123",
      // remember: false,
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    dispatch(SetLoginError(""));
    try {
      await login({
        email: data.email,
        password: data.password,
        // isRemember: data.remember,
      }).unwrap();
    } catch (err) {
      const fetchError = err as FetchBaseQueryError;

      if (
        fetchError?.status === "FETCH_ERROR" ||
        fetchError?.status === "TIMEOUT_ERROR"
      ) {
        dispatch(
          SetLoginError(
            "Network error. Please check your connection and try again.",
          ),
        );
        return;
      }

      const errorData = fetchError?.data as TErrorResponse | undefined;
      const fieldErrors = errorData?.errorSources?.filter(
        (source) =>
          source?.path &&
          FORM_FIELDS.includes(source.path as (typeof FORM_FIELDS)[number]),
      );

      if (fieldErrors?.length) {
        fieldErrors.forEach((source) => {
          setError(source.path as keyof TFormValues, {
            type: "server",
            message: source.message,
          });
        });
        return;
      }

      dispatch(
        SetLoginError(
          errorData?.message || "Something went wrong. Please try again.",
        ),
      );
    }
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
