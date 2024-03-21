import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// Forwarding attributes of <button> to component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          "w-full rounded-full border border-transparent bg-[#1db954] p-3 text-xl font-bold text-neutral-900 transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
