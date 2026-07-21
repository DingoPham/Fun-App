import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/API";


function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {

            setError("Passwords do not match.");

            return;
        }

        try {

            setLoading(true);

            await api.post("/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password
            });

            navigate("/login");

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <form
                className="register-card"
                onSubmit={handleSubmit}
            >

                <h2>Create Account</h2>

                <p className="subtitle">
                    Register a new account
                </p>

                {error && (
                    <div className="error-box">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label>Username</label>

                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>

                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>

                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="register-btn"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Register"}
                </button>

                <div className="bottom-text">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </form>

        </div>

    );

}

export default Register;