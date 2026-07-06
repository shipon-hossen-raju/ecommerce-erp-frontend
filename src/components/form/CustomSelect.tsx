/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller } from "react-hook-form";
import { Select } from "antd";

export type TOption = { label: string; value: string | boolean };

type TProps = {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  options: TOption[];
  showSearch?: boolean;
  className?: string;
  defaultValue?: string | boolean;
};

const CustomSelect = ({
  label,
  name,
  control,
  placeholder = "Select",
  showSearch = true,
  options,
  className = "",
  defaultValue,
}: TProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-700 ${className ?? ""}`}
      >
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              value={field.value ?? undefined}
              placeholder={placeholder}
              options={options}
              defaultValue={defaultValue}
              className={`w-full mt-1 ring-0 border bg-[#0000001A] focus:outline-none rounded-md focus:border-primary ${
                error ? "border-red" : ""
              }`}
              showSearch={showSearch}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />

            {error && <p className="text-red text-sm mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default CustomSelect;
