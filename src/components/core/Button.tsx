import React, { ButtonHTMLAttributes, HTMLProps } from "react";

interface BUTTON_PROPS
  extends HTMLProps<ButtonHTMLAttributes<HTMLButtonElement>> {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  bgColor?: string;
  textColor?: string;
  className?: string;
  [key: string]: any;
}

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}: BUTTON_PROPS) {
  return (
    <button
      role="button"
      type={type}
      className={`px-4 py-2 rounded-xl cursor-pointer ${bgColor} ${textColor} ${className}`}
    >
      {children}
    </button>
  );
}
