import React, { useState } from "react";

const ProfileFields = ({ updatedProfile, setUpdatedProfile }) => {
  const [phoneError, setPhoneError] = useState("");

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (phoneNumber.length > 11) return; // Limit to 10 digits after +234

    setUpdatedProfile({
      ...updatedProfile,
      number: phoneNumber,
    });

    // Show error if phone number is less than 10 digits
    // if (phoneNumber.length < 10) {
    //   setPhoneError("Phone number must be at least 10 digits.");
    // } else {
    //   setPhoneError("");
    // }
  };

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
    {
      label: "Phone Number",
      id: "phoneNumber",
      type: "tel",
      placeholder: "08012345678",
      value: updatedProfile.number || "",
      onChange: handlePhoneChange,
    },
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
          {field.id === "phoneNumber" ? (
            <div className="flex items-center ">
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className=" focus:border-black w-full text-nowrap bg-white px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] active:rounded-[4px] duration-200"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ) : (
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:border-black duration-300"
              value={field.value}
              onChange={field.onChange}
            />
          )}
          {field.id === "phoneNumber" && phoneError && (
            <p className="text-red-500 text-sm">{phoneError}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileFields;
