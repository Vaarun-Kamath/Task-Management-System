import Image from "next/image";
import { ReactNode } from "react";
type Props = {
  sz: number;
  loading: boolean;
  children: ReactNode;
};
export default function SubmitButton(props: Props) {
  return (
    <button
      type="submit"
      disabled={props.loading}
      className="w-full font-medium flex items-center justify-center transition-all duration-200 text-white text-lg rounded-sm bg-slate-900 hover:bg-slate-800 py-2.5 mt-7 mb-6"
    >
      {props.children}
      {props.loading && (
        <Image
          src="images/bars.svg"
          alt="Loading"
          className="ml-2 text-white select-none"
          width={props.sz}
          height={props.sz}
        />
      )}
    </button>
  );
}
