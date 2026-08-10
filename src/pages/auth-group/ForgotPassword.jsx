import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/API";
import { useToast } from "../../context/ToastContext";
import { FaArrowLeft } from "react-icons/fa6";

function ForgotPassword() {
    const navigate = useNavigate();
    const { success, error } = useToast();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            error("Please enter your email.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/forgot-password", {
                email: email.trim()
            });

            success(
                "If this email exists, a password reset link has been sent."
            );

            setEmail("");
        } catch (err) {
            console.error(err);
            error(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <button type="button" className="auth-back-button" onClick={() => navigate("/login")}>
                    <FaArrowLeft /> Back to login
                </button>

                <div className="auth-header">
                    <div className="auth-icon">
                        <FaEnvelope />
                    </div>

                    <h1>Forgot password?</h1>

                    <p>
                        Enter the email address associated with your
                        account and I'll send you a link to reset
                        your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="auth-form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input className="auth-input-wrapper"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                autoComplete="email"
                                disabled={loading}
                            />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send reset link"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default ForgotPassword;