/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TProps = {
  label: string;
  name: string;
  control: any;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
  onInput?: React.FormEventHandler<HTMLInputElement>;
};

const CustomInput = ({
  label,
  name,
  type = "text",
  control,
  placeholder = "",
  onInput,
  disabled = false,
}: TProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            const baseClass = `w-full mt-1 border bg-[#0000001A] focus:outline-none rounded-md px-4 py-2 pr-10 ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`;
            return (
              <>
                {type === "password" ? (
                  <>
                    <div className="relative">
                      <input
                        {...field}
                        value={field.value ?? ""}
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`${baseClass} ${
                          disabled
                            ? "bg-gray-100 disabled:cursor-not-allowed"
                            : ""
                        } ${error ? "border-red" : ""}`}
                      />
                      <div
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    {error && (
                      <p className="text-red text-sm mt-1">{error.message}</p>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type={type}
                      {...field}
                      value={field.value ?? ""}
                      placeholder={placeholder}
                      onInput={onInput}
                      disabled={disabled}
                      className={`${baseClass} ${
                        disabled
                          ? "bg-gray-100 disabled:cursor-not-allowed"
                          : ""
                      } ${error ? "border-red" : ""}`}
                    />
                    {error && (
                      <p className="text-red text-sm mt-1">{error.message}</p>
                    )}
                  </>
                )}
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default CustomInput;
