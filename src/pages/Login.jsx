import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { success, error } = useToast();
    const handleLogin = async () => {
        try {
            await login(username,password);
            success("Login successful!");
            navigate("/settings");
        }
        catch {
            error("Incorrect account or password...");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-card">
                <h1>Login</h1>
                <div className="login-group">
                    <label>Username</label>
                    <input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="login-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="login-btn" disabled={loading} onClick={handleLogin}>
                    {loading ? "Signing in..." : "Login"}
                </button>
                <div className="login-footer">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;