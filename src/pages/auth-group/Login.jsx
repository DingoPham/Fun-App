import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { success, error } = useToast();

    const handleLogin = async () => {
        setLoading(true);

        try {
            await login(username, password);

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

                    <input
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>

                <div className="login-group">
                    <label>Password</label>

                    <div className="password-input-wrapper">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(
                                    prev => !prev
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword
                                ? <FaEyeSlash />
                                : <FaEye />
                            }
                        </button>

                    </div>
                </div>

                <button
                    className="login-btn"
                    disabled={loading}
                    onClick={handleLogin}
                >
                    {loading
                        ? "Signing in..."
                        : "Login"}
                </button>

                <div className="login-footer">
                    Don't have account?
                    <Link to="/register">
                        {" "}Register
                    </Link>

                    <span>, or you </span>

                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;