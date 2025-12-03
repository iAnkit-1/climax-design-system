import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-[var(--radius)] border bg-input px-4 py-2 text-base transition-climax file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        error: "border-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-0",
        success: "border-success focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-0",
        warning: "border-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning focus-visible:ring-offset-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
  success?: string;
  warning?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, error, success, warning, ...props }, ref) => {
    // Auto-detect variant based on validation messages
    const resolvedVariant = error ? "error" : success ? "success" : warning ? "warning" : variant;
    const message = error || success || warning;

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(inputVariants({ variant: resolvedVariant, className }))}
          ref={ref}
          {...props}
        />
        {message && (
          <p
            className={cn(
              "mt-1.5 text-sm",
              error && "text-destructive",
              success && "text-success",
              warning && "text-warning"
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
