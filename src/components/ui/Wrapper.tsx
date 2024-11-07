import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  disablePadding?: boolean; // New prop to control padding
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  className = "",
  disablePadding = false,
}) => {
  return (
    <section
      className={` w-full ${
        disablePadding ? "py-2 px-6 sm:px-10 xl:px-16" : "pt-9 pb-12 px-6 xl:px-24 sm:px-14" // Conditionally add padding
      } ${className}`}
    >
      {children}
    </section>
  );
};

export default Wrapper;
