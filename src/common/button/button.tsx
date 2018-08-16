import * as React from "react";

export interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.StatelessComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
}) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
