import { useState } from "react";
import { api } from "../services/API";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try{

            const result = await api.post("/login",{

                username,
                password

            });

            localStorage.setItem(
                "token",
                result.token
            );

            login(result);

            navigate("/");

        }catch{

            alert("Sai tài khoản hoặc mật khẩu");

        }

    }

    return(
        <>
            <input
                value={username}
                onChange={e=>setUsername(e.target.value)}
            />

            <input
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>
        </>
    )

}

export default Login;