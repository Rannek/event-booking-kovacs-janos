import React, { useEffect } from 'react';

const Toast = ({ message, type, onDismiss }) => {
    const baseClasses = 'w-full max-w-sm p-4 rounded-lg shadow-lg text-white flex justify-between items-center transition-opacity duration-300';
    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type] || 'bg-gray-800'}`}>
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-4 font-bold text-lg opacity-70 hover:opacity-100">&times;</button>
        </div>
    );
};

export default Toast;
