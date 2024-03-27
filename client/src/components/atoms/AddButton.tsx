import { Children, MouseEventHandler } from "react";
import { MdAddChart } from "react-icons/md";
interface AddButtonProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    onclick: MouseEventHandler;
    width?: string;
}
export default function AddButton(props: AddButtonProps){
    return (
        <button 
            className={"flex border-2 items-center gap-2 px-4 py-1 rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-200 "+(props.width ||"")}
            onClick={props.onclick}
        >
        <span>
            <MdAddChart />
        </span>
        {props.children}
        </button>);
}