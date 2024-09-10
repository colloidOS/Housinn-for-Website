// PasswordFields.js
import React from "react";

const PasswordFields = ({ updatePassword, setUpdatedPassword }) => {
  const passwordFields = [
    {
      label: "Current Password",
      id: "currentPassword",
      type: "password",
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
      type: "password",
      placeholder: "Enter your new password",
      value: updatePassword.newPassword,
      onChange: (e) =>
        setUpdatedPassword({
          ...updatePassword,
          newPassword: e.target.value,
        }),
    },
    // Other password fields...
  ];

  return passwordFields.map((field) => (
    <div key={field.id} className="w-full gap-1">
      <label
        className="block text-gray-700 text-sm font-bold"
        htmlFor={field.id}
      >
        {field.label}
      </label>
      <input
        id={field.id}
        type={field.type}
        placeholder={field.placeholder}
        className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
        value={field.value}
        onChange={field.onChange}
      />
    </div>
  ));
};

export default PasswordFields;
