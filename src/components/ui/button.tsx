import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-climax focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: Deep Teal - Main CTA actions
        primary: "bg-primary text-primary-foreground hover:bg-primary-light shadow-climax-md rounded-[var(--radius)]",
        // Secondary: Soft Teal - Supporting actions
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/20 rounded-[var(--radius)]",
        // Ghost: Transparent - Subtle actions
        ghost: "hover:bg-muted hover:text-foreground rounded-[var(--radius)]",
        // Accent: Lime - High-energy actions
        accent: "bg-accent text-accent-foreground hover:bg-accent-dark shadow-climax-md rounded-[var(--radius)]",
        // Outline: Border only - Secondary emphasis
        outline: "border border-input bg-transparent hover:bg-muted rounded-[var(--radius)]",
        // Destructive: For delete/remove actions
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-climax-md rounded-[var(--radius)]",
        // Link: Text only
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 text-base",
        sm: "h-9 px-4 text-sm rounded-[var(--radius-sm)]",
        lg: "h-14 px-8 text-lg rounded-[var(--radius-lg)]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
