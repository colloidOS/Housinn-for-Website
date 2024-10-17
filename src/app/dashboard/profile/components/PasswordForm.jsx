import React from 'react';
import PasswordFields from '../PasswordFields';
import { ClipLoader } from 'react-spinners';
import Button from '../Button';

const PasswordForm = ({
  updatePassword,
  setUpdatedPassword,
  handlePasswordChange,
  isPasswordLoading,
}) => {
  return (
    <form className="flex gap-3 w-full" onSubmit={handlePasswordChange}>
    <div className="flex flex-col gap-0 ">
      <p className="text-lg font-semibold">Change Password</p>
      <p className="text-sm font-normal text-gray-600 w-[150px] lg:w-[300px]">
        *After you change the password you will have to login again.
      </p>
    </div>
    <div className="px-12 py-8 flex flex-col gap-8 w-full">
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
