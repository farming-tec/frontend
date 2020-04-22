import React from 'react';

type ButtonProps = React.ComponentProps<"button"> & {
    variant: "primary" | "secundary";
};
  
export const Button: React.FunctionComponent<ButtonProps> = ({
    children,
    variant,
    ...props
}) => {
    return <button>{children}</button>;
};
  