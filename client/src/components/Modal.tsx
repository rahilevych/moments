import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg relative overflow-auto max-h-[50vh]'>
        <button
          onClick={props.onClose}
          className='text-red-500 absolute top-2 right-2 text-2xl'>
          X
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
