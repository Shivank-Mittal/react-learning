import React from 'react';

export default function Card({
  children,
  show,
  className,
  ...props
}: {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  props?: React.HTMLProps<HTMLDivElement>;
}) {
  return (
    <div
      className={`w-20 h-25 bg-gray-300 text-white flex justify-center items-center cursor-pointer rounded-xl  ${className}`}
      {...props}
    >
      {show ? children : '?'}
    </div>
  );
}
