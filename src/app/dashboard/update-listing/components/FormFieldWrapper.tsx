import React from 'react';

interface FormFieldWrapperProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({ label, required = false, children }) => {
  return (
    <div className="flex flex-col gap-1 col-span-2 md:col-span-1 w-full ">
      <label className="text-sm font-semibold">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
  }
  
 export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children }) => (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
      <h2 className="font-bold text-lg text-primary text-center col-span-2">{title}</h2>
      {children}
    </section>
  );


interface WrapperProps {
  title: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ title, children }) => {
  return (
    <div className="w-full flex flex-col gap-5 bg-background-2">
      <h1 className="py-4 px-12 text-2xl text-center md:text-left  font-bold border-b border-gray-500">
        {title}
      </h1>
      {children}
    </div>
  );
};



interface FormWrapperProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ onSubmit, children }) => {
  return (
    <form
      className="flex flex-col gap-16 items-center justify-center px-6 pt-2 pb-10 md:px-20 xl:px-52 w-full"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};