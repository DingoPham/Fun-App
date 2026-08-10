import { createContext, useContext, useState, useMemo, useCallback } from "react";
import ToastContainer from "../components/toast/ToastContainer";

const ToastContext = createContext();
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message, type = "info", duration = 5000) => {
            const id = Date.now() + Math.random();

            const toast = {
                id,
                message,
                type,
                duration
            };

            setToasts(prev => [...prev, toast]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        },
        [removeToast]
    );

    const success = useCallback(
        (msg, time) => {
            showToast(msg, "success", time);
        },
        [showToast]
    );

    const error = useCallback(
        (msg, time) => {
            showToast(msg, "error", time);
        },
        [showToast]
    );

    const warning = useCallback(
        (msg, time) => {
            showToast(msg, "warning", time);
        },
        [showToast]
    );

    const info = useCallback(
        (msg, time) => {
            showToast(msg, "info", time);
        },
        [showToast]
    );

    const value = useMemo(
        () => ({
            success,
            error,
            warning,
            info
        }),
        [success, error, warning, info]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}

            <ToastContainer
                toasts={toasts}
                removeToast={removeToast}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}