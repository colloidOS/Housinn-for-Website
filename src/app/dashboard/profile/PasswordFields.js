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
    {
      label: "Confirm New Password",
      id: "confirmPassword",
      type: "password",
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
      {/* First field (row layout) */}
      <div className="flex gap-6 w-full items-center">
        <div key={passwordFields[0].id} className="w-full gap-1">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor={passwordFields[0].id}
          >
            {passwordFields[0].label}
          </label>
          <input
            id={passwordFields[0].id}
            type={passwordFields[0].type}
            placeholder={passwordFields[0].placeholder}
            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
            value={passwordFields[0].value}
            onChange={passwordFields[0].onChange}
          />
        </div>
      </div>

      {/* Last two fields (column layout) */}
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        {passwordFields.slice(1).map((field) => (
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
    </div>
  );
};

export default PasswordFields;
