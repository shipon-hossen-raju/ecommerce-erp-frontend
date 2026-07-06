/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Select } from "antd";
import { Controller } from "react-hook-form";

type TProps = {
  label: string;
  name: string;
  control: any;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string
  disabled?:boolean
};

const CustomMultiSelect = ({ label, name, control, options, disabled=false }: TProps) => {
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
              <Select
                  {...field}
                  mode="multiple"
                  placeholder="Please select"
                   style={{ width: "100%",}} 
                  className="custom-select-padding"
                  // style={{ width: "100%"}}
                  options={options}
                  disabled={disabled}
                  status={`${ error?.message ? 'error' : ''}`}
                />
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

export default CustomMultiSelect;
