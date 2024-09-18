import React from "react";

const Button = ({ children, disabled, onClick, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-[11px] bg-secondary text-white rounded-md text-base font-semibold ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
