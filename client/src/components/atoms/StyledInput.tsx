import clsx from "clsx";
import React from "react";

export default function StyledInput({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <>
      <input
        className={clsx(
          className,
          "text-gray-800 text-lg font-medium tracking-tight",
          "focus:ring-0 focus:border-gray-800 rounded-sm bg-transparent border-gray-500 focus:shadow-md",
          "placeholder:text-gray-500 placeholder:text-md transition-all duration-200"
        )}
        {...rest}
      />
    </>
  );
}
