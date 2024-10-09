import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = "" }) => {
  return (
    <section className={` px-6  lg:px-24 sm:px-14  pt-9 pb-12 w-full ${className}`}>
      {children}
    </section>
  );
};

export default Wrapper;
