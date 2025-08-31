import React from "react";
import bg2 from "../../assets/bg4.jpg"; // adjust path

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>
  ) => void;
}

export default function Button2({
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundImage: `url(${bg2})` }}
      className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-lg bg-cover bg-center hover:opacity-90 shadow-md hover:scale-105 transition-all duration-500${className}`}
    >
      {children}
    </button>
  );
}
