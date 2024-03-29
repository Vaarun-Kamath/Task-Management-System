import clsx from "clsx";
import React from "react";
export interface StyledOptionProps
  extends React.ComponentPropsWithoutRef<"select"> {
  options: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function StyledOption({
  className,
  options,
  onChange,
  ...rest
}: StyledOptionProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(event);
  };
  return (
    <select
      id="Lanes"
      className={clsx(
        className,
        "text-gray-800 text-lg font-medium tracking-tight",
        "focus:ring-0 focus:border-gray-800 rounded-sm bg-transparent border-gray-500 focus:shadow-md",
        "placeholder:text-gray-500 placeholder:text-md transition-all duration-200"
      )}
      onChange={handleChange}
      {...rest}
    >
      <option value={0}>Select an Option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {" "}
          {option}{" "}
        </option>
      ))}
    </select>
  );
}
