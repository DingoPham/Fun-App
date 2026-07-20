import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, roles }) {

    const { user } = useAuth();

    if (!user)
        return <Navigate to="/login" />;

    if (!roles.includes(user.role))
        return <Navigate to="/403" />;

    return children;
}

export default ProtectedRoute