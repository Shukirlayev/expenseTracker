import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg mx-4 rounded-2xl bg-white shadow-xl animate-scaleIn"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-xl leading-none text-gray-500">&times;</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
