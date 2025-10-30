import React, { createContext, useState, useCallback } from 'react';

const ToastContext = createContext();

let toastId = 1;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'success') => {
        const id = toastId++;
        const newToast = { id, message, type };
        setToasts(currentToasts => [...currentToasts, newToast]);
        setTimeout(() => {
            removeToast(id);
        }, 4000); // 4 másodperc után eltűnik
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ addToast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;
