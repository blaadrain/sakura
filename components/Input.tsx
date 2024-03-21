import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
        className={twMerge(
          `
          text-md 
          flex 
          w-full 
          rounded-lg 
          border 
          border-transparent 
          bg-neutral-700 
          p-3 
          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium
          placeholder:text-neutral-400
          focus:outline-none
          disabled:cursor-not-allowed
          disabled:opacity-50 
        `,
          className,
        )}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
