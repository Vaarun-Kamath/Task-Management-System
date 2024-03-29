import { FocusEventHandler, ReactNode, useState } from "react";

export default function ContextMenu(props: {
  position: { x: number; y: number };
  children: ReactNode;
  setContextMenuPosition: (position: { x: number; y: number } | null) => void;
}) {
  const [timer, setTimer] = useState<number | null>(null);

  const handleBlur: FocusEventHandler<HTMLDivElement> | undefined = () => {
    if (timer) clearTimeout(timer);
    props.setContextMenuPosition(null);
  };

  const handleMouseEnter = () => {
    if (timer) clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(handleBlur, 300);
    setTimer(timeoutId);
  };

  const style: React.CSSProperties = {
    top: props.position.y,
    left: props.position.x,
  };
  return (
    <div
      tabIndex={0}
      id="contextMenu"
      style={style}
      className=" focus-visible:bg-slate-600 bg-white text-gray-800 rounded-md absolute drop-shadow-md"
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  );
}
