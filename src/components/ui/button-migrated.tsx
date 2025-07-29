import { Button as MYDSButton } from "@/components/ui/myds-wrapper";
import { ButtonHTMLAttributes, forwardRef } from "react";

// Map KD Portal variants to MYDS variants
const variantMap = {
  default: "default-outline",
  primary: "primary-fill",
  secondary: "default-outline",
  "secondary-colour": "primary-outline",
  tertiary: "default-ghost",
  "tertiary-colour": "primary-ghost",
} as const;

// Map KD Portal sizes to MYDS sizes
const sizeMap = {
  default: "medium",
  sm: "small",
  md: "medium",
  lg: "large",
  icon: "small", // MYDS doesn't have icon size, using small
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantMap;
  size?: keyof typeof sizeMap;
  asChild?: boolean; // MYDS doesn't support asChild, but we'll handle it
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "sm", asChild = false, children, ...props }, ref) => {
    // If asChild is true, we need to handle it differently since MYDS doesn't support it
    if (asChild) {
      // For asChild, we'll render the children directly with the button props
      return (
        <span
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <MYDSButton
        variant={variantMap[variant]}
        size={sizeMap[size]}
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </MYDSButton>
    );
  },
);

Button.displayName = "Button";

export { Button }; 