export default function AddButton(props: {
  onclick: () => void;
  text: string;
  icon: any;
}){
  return (
    <button
      className={
        "flex border-2 items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 "
      }
      onClick={props.onclick}
    >
      <span>{props.icon}</span>
      {props.text}
    </button>
  );
}