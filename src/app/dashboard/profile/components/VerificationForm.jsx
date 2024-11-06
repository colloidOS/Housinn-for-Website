import React from "react";
import Button from "../Button";
import AddressFields from "../AddressFields";
import { ClipLoader } from "react-spinners";

const VerificationForm = ({
  updateVerification,
  setUpdateVerification,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  handleVerificationSubmit,
  isVerificationLoading,
  loading,
}) => {
  return (
    <form
      className="flex flex-col sm:flex-row gap-8 lg:gap-[90px] xl:gap-[160px]"
      onSubmit={handleVerificationSubmit}
    >
      <div className="flex flex-col gap-2 text-nowrap">
        <p className="text-lg font-semibold">Verification</p>
        <p className="text-sm font-normal text-gray-600 sm:w-[150px]">
          Get your account verified!
        </p>
      </div>
      <div className="sm:px-12 lg:py-8 flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AddressFields
              updateVerification={updateVerification}
              setUpdateVerification={setUpdateVerification}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          )}
        </div>
        <Button
          type="submit"
          className="w-fit"
          onClick={null}
          disabled={isVerificationLoading}
        >
          {isVerificationLoading ? (
            <span className="flex items-center gap-2">
              Verifying <ClipLoader color="#fff" size={20} />
            </span>
          ) : (
            "Verify Account"
          )}
        </Button>
      </div>
    </form>
  );
};

export default VerificationForm;
