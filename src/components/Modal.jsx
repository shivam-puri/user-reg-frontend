import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-primary p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold">Warning</h2>
                <p>Are you sure you want to delete your account? This action is irreversible.</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 bg-white text-black p-2 px-4 rounded-custom">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-600 text-white p-2 px-4 rounded-custom">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;