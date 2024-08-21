import React from "react";

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-[11px] bg-secondary text-white rounded-md text-base font-semibold ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
