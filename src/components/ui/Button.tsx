import React from "react";
import { CgSpinnerTwo } from "react-icons/cg";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
  btnType?: "outline" | "solid";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  isDisabled = false,
  isLoading = false,
  children,
  className = "",
  loadingText = "Processing...",
  btnType = "solid",
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`w-72 mx-auto flex items-center justify-center gap-2 cursor-pointer  py-2 rounded-md font-semibold transition-colors duration-100 disabled:cursor-not-allowed ${
        btnType === "outline"
          ? "bg-transparent border border-primary hover:bg-primary text-primary hover:text-white"
          : "bg-primary text-white hover:bg-transparent border border-primary hover:text-primary"
      }        
        ${className} 
      `}
      {...rest}
    >
      {isLoading ? (
        <>
          <CgSpinnerTwo className="animate-spin" fontSize={16} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
