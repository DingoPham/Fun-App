import Toast from "../toast/Toast";

function ToastContainer({toasts, removeToast}) {
    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} removeToast={removeToast}/>
            ))}
        </div>
    );
}

export default ToastContainer;