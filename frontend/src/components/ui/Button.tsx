import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<Variants, string> = {
  primary:
    "bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-md hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-all duration-300",

  secondary:
    " text-indigo-600 border border-indigo-600 shadow-md hover:bg-indigo-100 transition-all duration-300",
};

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles =
  "rounded-md flex items-center cursor-pointer transition-all duration-200 hover:opacity-90 shadow-lg";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.fullWidth ? "w-full justify-center" : ""} ${
        props.loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={props.onClick}
    >
      {props.startIcon && <span className="pr-2">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="pl-2">{props.endIcon}</span>}
    </button>
  );
};
