import React, { useState } from "react";
import PasswordFields from "../PasswordFields";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { z } from "zod";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to confirmPassword field
  });

const PasswordForm = ({
  updatePassword,
  setUpdatedPassword,
  handlePasswordChange,
  isPasswordLoading,
}) => {
  const [formErrors, setFormErrors] = useState({}); // State to store errors

  // Handle password change with validation
  const onSubmit = (event) => {
    event.preventDefault();

    const result = passwordSchema.safeParse(updatePassword);
    if (!result.success) {
      // Extract and set error messages
      const errors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      toast.error("Passwords do not match");
      return;
    }

    // Clear errors if validation passes
    setFormErrors({});
    handlePasswordChange(); // Call your actual password change function
  };
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 py-6 sm:p-0 w-full"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-0 ">
        <p className="text-lg font-semibold">Change Password</p>
        <p className="text-sm font-normal text-gray-600 sm:w-[150px] lg:w-[230px] xl:w-[300px]">
          *After you change the password you will have to login again.
        </p>
      </div>
      <div className="sm:px-12 sm:py-8 flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 w-full items-center">
            <PasswordFields
              updatePassword={updatePassword}
              setUpdatedPassword={setUpdatedPassword}
            />
          </div>
        </div>
        <Button
          onClick={null}
          className="w-fit"
          type="submit"
          disabled={isPasswordLoading}
        >
          {isPasswordLoading ? (
            <span className="flex items-center gap-2">
              Resetting
              <ClipLoader color="#fff" size={20} />
            </span>
          ) : (
            "Reset Password"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
