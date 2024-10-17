import React from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineCancel } from "react-icons/md";
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  // Create a portal for the modal so it renders outside of the normal DOM hierarchy
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-3xl hover:text-gray-700"
        >
         <MdOutlineCancel />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
