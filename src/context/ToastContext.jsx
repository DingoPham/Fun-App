import { createContext, useContext, useState } from "react";
import ToastContainer from "../components/toast/ToastContainer";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const removeToast = (id) => {setToasts(prev => prev.filter(t => t.id !== id));};
    const showToast = (message, type = "info", duration = 5000) => {
        const id = Date.now() + Math.random();
        const toast = {id, message, type, duration};
        setToasts(prev => [...prev, toast]);
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    };
    const value = {
        success: (msg, time) => showToast(msg, "success", time),
        error: (msg, time) => showToast(msg, "error", time),
        warning: (msg, time) => showToast(msg, "warning", time),
        info: (msg, time) => showToast(msg, "info", time)
    };
    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast}/>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}