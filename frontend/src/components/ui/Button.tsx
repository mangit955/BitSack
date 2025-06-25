import type { ReactElement } from "react";

type Varients = "primary" | "secondary";
interface ButtonProps {
  variant: Varients;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<Varients, string> = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

const defaultStyles =
  "rounded-md flex items-center text-sm cursor-pointer transition-all duration-150 hover:opacity-80 shadow-md ";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${
        props.loading ? "opacity-45 cursor-not-allowed" : ""
      }`}
      onClick={props.onClick}
    >
      {props.startIcon ? <div className="pr-2 ">{props.startIcon}</div> : null}{" "}
      {props.text} {props.endIcon}
    </button>
  );
};
