import { HTMLProps, useId } from "react";
import { UseControllerProps } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  type: string;
  className?: string;
  labelClassName?: string;
  props: UseControllerProps;
}

export default function Input({
  label,
  type = "text",
  className = "",
  labelClassName = "",
  props,
}: InputProps) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className={`inline-block mb-1 pl-1 ${labelClassName}`}
          htmlFor={id}
        >
          {" "}
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        className={`px-3 py-2 rounded-lg text-black bg-white outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={id}
      />
    </div>
  );
}
