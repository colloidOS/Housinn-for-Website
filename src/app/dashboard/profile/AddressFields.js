import React from "react";
import { nigeriaStateCityOptions } from "./StateAndCities"; // Already imported here

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
    //   type: "number",
    //   placeholder: "Enter your CAC Registration Code",
    //   value: updateVerification.cacNumber,
    //   onChange: (e) =>
    //     setUpdateVerification({
    //       ...updateVerification,
    //       cacNumber: e.target.value,
    //     }),
    // },
  ];

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col flex-wrp gap-6 mb-4">
        {/* Display the dropdown fields (State and City) in a row */}
        {addressFields.slice(0, 2).map((field) => (
          <div key={field.id} className="w-full lg:w-1/2 gap-1">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor={field.id}
            >
              {field.label}
            </label>
            <select
              id={field.id}
              className="w-full px-4 py-2 border border-gray-300 rounded select-wrapper"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="" className="w-[300px] ">Select {field.label}</option>
              {field.options.map((option, index) => (
                <option key={index} value={option} className="">
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {/* Display the text fields (Street and CAC Number) in columns */}
        {addressFields.slice(2, 4).map((field) => (
          <div key={field.id} className="w-full">
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
              className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:border-black"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressFields;
