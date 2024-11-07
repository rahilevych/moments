import { X } from '@phosphor-icons/react';
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
      <div
        className='relative bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-6 md:p-8 overflow-auto'
        style={{ maxHeight: '90vh' }}>
        <button
          onClick={props.onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          aria-label='Close'>
          <X size={24} />
        </button>
        <div className='overflow-y-auto max-h-[calc(100vh-2rem)]'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
