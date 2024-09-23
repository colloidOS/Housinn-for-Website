import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = "" }) => {
  return (
    <section className={` px-6 md:px-[6.5rem] sm:px-14  pt-9 pb-12 w-full ${className}`}>
      {children}
    </section>
  );
};

export default Wrapper;
