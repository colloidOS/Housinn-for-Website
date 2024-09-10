import React from "react";
import { nigeriaStateCityOptions } from "./StateAndCities"; // You already imported it here, no need to pass as a prop

const AddressFields = ({
  updateVerification,
  setUpdateVerification,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}) => {
  const addressFields = [
    {
      label: "State",
      id: "state",
      type: "dropdown",
      options: nigeriaStateCityOptions.map((state) => state.state),
      value: selectedState || "",
      onChange: (value) => {
        setSelectedState(value);
        setSelectedCity(""); // Clear the city when state is changed
        setUpdateVerification({
          ...updateVerification,
          state: value,
          town: "", // Reset city value in verification
        });
      },
    },
    {
      label: "City",
      id: "city",
      type: "dropdown",
      options:
        nigeriaStateCityOptions.find((s) => s.state === selectedState)
          ?.cities || [],
      value: selectedCity || "",
      onChange: (value) => {
        setSelectedCity(value);
        setUpdateVerification({
          ...updateVerification,
          town: value,
        });
      },
    },
    {
      label: "Street",
      id: "street",
      type: "text",
      placeholder: "e.g No 25 Asokoro Street",
      value: updateVerification.address || "",
      onChange: (e) =>
        setUpdateVerification({
          ...updateVerification,
          address: e.target.value,
        }),
    },
    // {
    //   label: "CAC Number",
    //   id: "cacNumber",
    //   type: "text",
    //   placeholder: "Enter your CAC Registration Code",
    //   value: updateVerification.cacNumber,
    //   onChange: (e) =>
    //     setUpdateVerification({
    //       ...updateVerification,
    //       cacNumber: e.target.value,
    //     }),
    // },
  ];

  return addressFields.map((field) => (
    <div key={field.id} className="w-full gap-1">
      <label
        className="block text-gray-700 text-sm font-bold"
        htmlFor={field.id}
      >
        {field.label}
      </label>
      {field.type === "dropdown" ? (
        <select
          id={field.id}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)} // Make sure the value updates properly
        >
          <option value="">Select {field.label}</option>{" "}
          {/* Optional placeholder */}
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
          value={field.value}
          onChange={(e) => field.onChange(e)} // Properly handle the input change event
        />
      )}
    </div>
  ));
};

export default AddressFields;
