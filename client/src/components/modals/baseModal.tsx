import { IoCloseSharp } from "react-icons/io5";
interface baseModalProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  setShowModal: () => void;
  modalTitle: String;
}

const BaseModal = (props: baseModalProps) => {
  return (
    <div className=" fixed w-screen h-screen flex justify-center items-center bg-opacity-50 bg-black left-0 top-0 ">
      <div className="transition-all duration-200 transform bg-white rounded-md shadow-2xl lg:w-1/3 md:w-2/3 w-full overflow-hidden z-50 opacity-100">
        <div className="px-4 py-3 bg-slate-800 rounded-t-md flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {props.modalTitle}
            </h2>
          </div>
          <button
            onClick={() => props.setShowModal()}
            className="cursor-pointer border-2 hover:text-red-500 hover:bg-gray-200 transition-all duration-200 p-1 flex items-center rounded-lg text-xs text-white"
          >
            <IoCloseSharp className="h-5 w-5 " />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[33rem]">
          <div className="p-10">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
