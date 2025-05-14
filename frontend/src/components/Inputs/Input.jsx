import React, { useState } from "react";
import { LuEye, LuEyeClosed, LuEyeOff } from "react-icons/lu";

export const Input = ({ value, onChange, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center gap-4 py-1.5 mt-1 border px-2 outline-none ring-0 border-[gray] w-full">
      <input
        className=" outline-none ring-0 border-none w-full"
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />

      {type == "password" && (
        <>
          {showPassword ? (
            <LuEye
              size={22}
              className="cursor-pointer"
              onClick={() => togglePassword()}
            />
          ) : (
            <LuEyeOff
              size={22}
              className="cursor-pointer"
              onClick={() => {
                togglePassword();
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
