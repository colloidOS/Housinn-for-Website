// ProfileFields.js
import React from "react";

const ProfileFields = ({ updatedProfile, setUpdatedProfile }) => {
  const profileFields = [
    {
      label: "First Name",
      id: "firstName",
      type: "text",
      placeholder: "Michael",
      value: updatedProfile.firstName || "",
      onChange: (e) =>
        setUpdatedProfile({
          ...updatedProfile,
          firstName: e.target.value,
        }),
    },
    {
      label: "Last Name",
      id: "lastName",
      type: "text",
      placeholder: "Chukwueke",
      value: updatedProfile.lastName || "",
      onChange: (e) =>
        setUpdatedProfile({
          ...updatedProfile,
          lastName: e.target.value,
        }),
    },
    {
      label: "Company Name (optional)",
      id: "companyName",
      type: "text",
      placeholder: "Mike’s Realties",
      value: updatedProfile.company || "",
      onChange: (e) =>
        setUpdatedProfile({
          ...updatedProfile,
          company: e.target.value,
        }),
    },
    // {
    //   label: "Email",
    //   id: "email",
    //   type: "email",
    //   placeholder: "mikesrealties@gmail.com",
    //   value: updatedProfile.email,
    //   onChange: (e) =>
    //     setUpdatedProfile({
    //       ...updatedProfile,
    //       email: e.target.value,
    //     }),
    // },
    {
      label: "Phone Number",
      id: "phoneNumber",
      type: "number",
      placeholder: "08012345678",
      value: updatedProfile.number || "",
      onChange: (e) =>
        setUpdatedProfile({
          ...updatedProfile,
          number: e.target.value,
        }),
    },
    // {
    //   label: "Password",
    //   id: "password",
    //   type: "password",
    //   placeholder: "••••••••",
    //   value: updatedProfile.password,
    //   onChange: (e) =>
    //     setUpdatedProfile({
    //       ...updatedProfile,
    //       password: e.target.value,
    //     }),
    // },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {profileFields.map((field) => (
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
      ))}
    </div>
  );
};

export default ProfileFields;
