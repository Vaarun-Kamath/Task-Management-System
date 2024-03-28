import { FocusEventHandler, ReactNode, useEffect, useRef } from "react";

export default function ContextMenu(props: {
  position: { x: number; y: number };
  onBlur: FocusEventHandler<HTMLDivElement> | undefined;
  children: ReactNode;
}) {
  const style: React.CSSProperties = {
    top: props.position.y,
    left: props.position.x,
  };
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contextMenuRef.current) contextMenuRef.current.focus();
  }, []);
  return (
    <div
      tabIndex={0}
      id="contextMenu"
      ref={contextMenuRef}
      style={style}
      className=" focus-visible:bg-slate-600 bg-white text-gray-800 rounded-md p-1 absolute border-2 shadow-sm"
      onBlur={props.onBlur}
    >
      {props.children}
    </div>
  );
}
