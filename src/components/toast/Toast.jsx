import {FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle} from "react-icons/fa";
import { TbCancel } from "react-icons/tb";

function Toast({toast, removeToast}) {
    const icons = {
        success: <FaCheckCircle />,
        error: <TbCancel />,
        warning: <FaExclamationTriangle />,
        info: <FaInfoCircle />
    };
    return (
        <div className={`toast ${toast.type}`}>
            <div className="toast-icon">{icons[toast.type]}</div>
            <div className="toast-message">{toast.message}</div>
            <button onClick={() => removeToast(toast.id)}>
               <FaTimesCircle />
            </button>
            <div className="toast-progress" style={{animationDuration: `${toast.duration}ms`}}/>
        </div>
    );
}

export default Toast;