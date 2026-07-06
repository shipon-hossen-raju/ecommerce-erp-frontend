/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller } from "react-hook-form";

type TProps = {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  rows?: number;
};

const CustomTextArea = ({ label, name, control, placeholder, rows=2 }: TProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <>
              <textarea
                {...field}
                rows={rows}
                value={field.value ?? ""}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
              ></textarea>
              {error && (
                <p className="text-red-600 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CustomTextArea;
