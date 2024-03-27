import { useState } from "react";
import AddButton from "./AddButton";
import BaseModal from "../modals/baseModal";

export default function ContextMenu(props: {position: {x:number, y:number}, onBlur:any}) {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: props.position.y,
      left: props.position.x,
      background: 'white',
      border: '1px solid #ccc',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
      padding: '5px',
      borderRadius: '4px',
      color: 'red'
    };
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showPriorityModal, setShowPriorityModal] = useState(false);
    const [showCollabModal, setShowCollabModal] = useState(false);
    return (
      <div tabIndex={0}
        style={style}
        className=" focus-visible:bg-slate-600"
        onBlur={props.onBlur}>
        <p>Context Menu</p>
        {/* Add your menu items here */}
        {showStatusModal && <BaseModal setShowModal={setShowStatusModal} modalTitle="Set Status">{"THE ACTUAL FORM LMAO"}</BaseModal>}
        {showPriorityModal && <BaseModal setShowModal={setShowPriorityModal} modalTitle="Set Priority">{"THE ACTUAL FORM LMAO"}</BaseModal>}
        {showCollabModal && <BaseModal setShowModal={setShowCollabModal} modalTitle="Assign Collaborator">{"THE ACTUAL FORM LMAO"}</BaseModal>}
        <AddButton onclick={()=>setShowStatusModal(true)}>Set Status</AddButton>
        <AddButton onclick={()=>setShowPriorityModal(true)}>Set Priority</AddButton>
        <AddButton onclick={()=>setShowCollabModal(true)}>Assign Collaborator</AddButton>
      </div>
    );
  };