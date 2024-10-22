import { Trash, X } from '@phosphor-icons/react';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0  '>
      <button
        onClick={props.onClose}
        className='text-white-500 absolute top-2 right-2 text-2xl cursor-pointer'>
        <X size={32} />
      </button>
      <div className='bg-white  rounded-lg shadow-lg relative overflow-auto w-auto max-w-[80vh]  max-h-[80vh] min-w-96 min-h-96'>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
