import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/API";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadUser() {

            try {

                const me = await api.get("/auth/me");

                setUser(me);

            }
            catch {

                setUser(null);

            }
            finally {

                setLoading(false);

            }
        }

        loadUser();

    }, []);

    async function login(username, password) {

        await api.post("/auth/login", {

            username,

            password

        });

        const me = await api.get("/auth/me");

        setUser(me);
    }

    async function logout() {

        await api.post("/auth/logout");

        setUser(null);
    }

    return (

       <AuthContext.Provider
    value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "Admin"
    }}
>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}