import React from "react";
import { TailSpin } from "react-loader-spinner";

interface PrimaryButtonProps {
  onClick?: () => void; // Make onClick optional
  children?: React.ReactNode; // Allow custom button text or content
  loading?: boolean; // For the loading state
  disabled?: boolean; // Disable the button
  className?: string; // To pass custom styles
  isSignIn?: boolean; // Optional for conditional text like "Sign in" or "Create Account"
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  loading = false,
  disabled = false,
  className = "",
  isSignIn,
}) => {
  return (
    <button
      className={` bg-primary text-white rounded ${className} ${
        disabled || loading
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex justify-center items-center ">
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="2"
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
