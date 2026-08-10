import { useState } from "react";
import {
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/API";
import { useToast } from "../../context/ToastContext";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { success, error, warning } = useToast();

    const token = searchParams.get("token");

    const [passwordForm, setPasswordForm] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            error("Invalid or missing reset token.");
            return;
        }

        if (!passwordForm.newPassword) {
            error("Please enter your new password.");
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            warning(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (
            passwordForm.newPassword !==
            passwordForm.confirmPassword
        ) {
            warning(
                "Password confirmation does not match."
            );
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/reset-password", {
                token,
                newPassword: passwordForm.newPassword
            });

            success("Password reset successfully!");

            setCompleted(true);
        } catch (err) {
            console.error(err);
            error(
                err.message ||
                "Unable to reset your password."
            );
        } finally {
            setLoading(false);
        }
    };

    if (completed) {
        return (
            <div className="auth-page">
                <div className="auth-card">

                    <div className="auth-header">

                        <div className="auth-icon">
                            ✓
                        </div>

                        <h1>Password reset</h1>

                        <p>
                            Your password has been changed
                            successfully.
                        </p>

                    </div>

                    <button
                        className="auth-submit-button"
                        onClick={() => navigate("/login")}
                    >
                        Back to login
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <button
                    type="button"
                    className="auth-back-button"
                    onClick={() => navigate("/login")}
                >
                    ← Back to login
                </button>

                <div className="auth-header">

                    <div className="auth-icon">
                        <FaLock />
                    </div>

                    <h1>Reset password</h1>

                    <p>
                        Create a new password for your account.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="auth-form-group">
                        <label htmlFor="new-password">
                            New password
                        </label>
                        <div className="auth-input-wrapper">
                            <input
                                id="new-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                autoComplete="new-password"
                                disabled={loading}/>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="confirm-password">
                            Confirm password
                        </label>
                        <div className="auth-input-wrapper">
                            <input id="confirm-password"
                                   type={showConfirmPassword ? "text" : "password"}
                                   placeholder="Re-enter your new password"
                                   value={passwordForm.confirmPassword}
                                   onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                   autoComplete="new-password"
                                   disabled={loading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset password"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default ResetPassword;