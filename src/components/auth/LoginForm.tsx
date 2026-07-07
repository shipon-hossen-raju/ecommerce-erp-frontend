import { zodResolver } from "@hookform/resolvers/zod";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useEffect, useRef, useState } from "react";
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

const DEMO_ACCOUNTS = [
  { label: "Admin", email: "admin@gmail.com", password: "Admin@123" },
  { label: "Manager", email: "hossen@gmail.com", password: "Manager@123" },
  { label: "Employee", email: "raju@gmail.com", password: "Employee@123" },
];

const LoginForm = () => {
  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { handleSubmit, control, setError, setValue } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const demoAccountsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        demoAccountsRef.current &&
        !demoAccountsRef.current.contains(event.target as Node)
      ) {
        setShowDemoAccounts(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleDemoLogin = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setValue("email", account.email);
    setValue("password", account.password);
    setShowDemoAccounts(false);
    onSubmit({ email: account.email, password: account.password });
  };

  return (
    <>
      {LoginError && <Error message={LoginError} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="relative" ref={demoAccountsRef}>
            <CustomInput
              label="Email"
              name="email"
              type="text"
              control={control}
              placeholder="Enter email address"
              onFocus={() => setShowDemoAccounts(true)}
            />
            {showDemoAccounts && (
              <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => handleDemoLogin(account)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-700">
                      {account.label}
                    </span>
                    <span className="text-gray-500">{account.email}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
