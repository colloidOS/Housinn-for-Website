import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

const PasswordFields = ({ updatePassword, setUpdatedPassword }) => {
  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle password visibility for a specific field
  const toggleVisibility = (fieldId) => {
    setVisible((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const passwordFields = [
    {
      label: "Current Password",
      id: "currentPassword",
      placeholder: "Enter your current password",
      value: updatePassword.oldPassword,
      onChange: (e) =>
        setUpdatedPassword({
          ...updatePassword,
          oldPassword: e.target.value,
        }),
    },
    {
      label: "New Password",
      id: "newPassword",
      placeholder: "Enter your new password",
      value: updatePassword.newPassword,
      onChange: (e) =>
        setUpdatedPassword({
          ...updatePassword,
          newPassword: e.target.value,
        }),
    },
    {
      label: "Confirm New Password",
      id: "confirmPassword",
      placeholder: "Confirm new password",
      value: updatePassword.confirmPassword,
      onChange: (e) =>
        setUpdatedPassword({
          ...updatePassword,
          confirmPassword: e.target.value,
        }),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {passwordFields.map((field) => (
        <div key={field.id} className="w-full gap-1 relative">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor={field.id}
          >
            {field.label}
          </label>
          <div className="relative">
            <input
              id={field.id}
              type={visible[field.id] ? "text" : "password"} // Toggle type based on visibility
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:border-black duration-300 "
              value={field.value}
              onChange={field.onChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform focus:outline-none -translate-y-1/2 text-gray-500 duration-300"
              onClick={() => toggleVisibility(field.id)}
            >
              {visible[field.id] ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordFields;
