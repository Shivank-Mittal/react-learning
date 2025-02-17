import { HTMLProps, useId } from 'react';
import { UseControllerProps } from 'react-hook-form';

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  label: string;
  className?: string;
  labelClassName?: string;
  options: string[];
  props: UseControllerProps;
}

export default function Select({ label, className, labelClassName, options, props }: SelectProps) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} id={id} className={`inline-block mb-1 pl-1 ${labelClassName}`}>
          {' '}
          {label}{' '}
        </label>
      )}
      <select
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        id={id}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {' '}
            {option}{' '}
          </option>
        ))}
      </select>
    </div>
  );
}
