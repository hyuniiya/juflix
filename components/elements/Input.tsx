import React from "react";

interface InputProps {
  id: string;
  value: string;
  label: string;
  type?: string;
  onChange: any;
}

const Input: React.FC<InputProps> = ({ id, value, label, type, onChange }) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="w-full bg-neutral-700 text-white rounded-md px-6 pt-6 pb-1 my-5 focus:outline-none focus:ring-0 appearance-none block peer"
        placeholder=""
      />
      <label
        className="absolute text-white text-md duration-150 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
