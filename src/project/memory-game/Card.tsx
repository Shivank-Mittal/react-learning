import React, { useRef } from 'react';

/**
 * @param Children rendered when the show property is true.
 * @param flip when to flip the card and show the children.
 * @pram className to apply the styles on the container
 * @emits cardClick custom event with the data passed as props.
 */
export default function Card({
  children,
  flip,
  className,
  ...props
}: {
  children: React.ReactNode;
  flip: boolean;
  className?: string;
  disabled?: boolean;
  props?: React.HTMLProps<HTMLDivElement>;
}) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const customEvent = new CustomEvent('cardClick', {
      bubbles: true,
      detail: { ...props }
    });
    componentRef.current?.dispatchEvent(customEvent);
  };

  return (
    <div
      id="container"
      role="card"
      ref={componentRef}
      onClick={handleClick}
      className={`bg-transparent w-20 h-25 perspective-1000 select-none ${className} `}
      {...props}
      aria-disabled
    >
      <div
        className="position-relative text-center justify-center preserve-3d transition-transform duration-800 w-full h-full"
        style={{ transform: flip ? 'rotateY(180deg)' : 'none' }}
      >
        {flip ? (
          <div className="shadow-lg flex flex-col justify-center w-full h-full backface-hidden border border-[coral] rounded-2xl">
            {children}
          </div>
        ) : (
          <div className="shadow-lg flex flex-col justify-center w-full h-full backface-hidden border border-[coral] rounded-2xl cursor-pointer">
            <p className="rotateY(180deg) color ">?</p>
          </div>
        )}
      </div>
    </div>
  );
}
