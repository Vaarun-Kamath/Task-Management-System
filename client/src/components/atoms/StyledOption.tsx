import clsx from "clsx";
import React from "react";
export interface StyledOptionProps
  extends React.ComponentPropsWithoutRef<"select"> {
  options: string[];
  values?: Array<string | number | readonly string[] | undefined>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function StyledOption({
  className,
  options,
  values,
  onChange,
  ...rest
}: StyledOptionProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(event);
  };
  var optionValues:Array<string | number | readonly string[] | undefined> = values || options;
  return (
    <>
      <label>Select an Option</label>
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
        {options.map((option, index) => (
          <option key={index} value={optionValues[index]}>
            {" "}
            {option}{" "}
          </option>
        ))}
        <option value="">{" "}
          None{" "}
        </option>
      </select>
    </>
  );
}
