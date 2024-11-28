import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold">Konfirmasi Logout</h2>
        <p>Apakah Anda yakin ingin keluar?</p>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-red-500 text-white rounded px-4 py-2 mr-2"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Ya, Keluar
          </button>
          <button className="bg-gray-300 rounded px-4 py-2" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
