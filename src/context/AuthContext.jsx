import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/API";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const loadUser = async () => {
        try {
            const me = await api.get("/auth/me");
            setUser(me);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (username, password) => {
        await api.post("/auth/login", {
            username,
            password
        });

        await loadUser();
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    const updateProfile = async (data) => {

        const updatedUser = await api.put(
            "/auth/profile",
            data
        );

        setUser(updatedUser);

        return updatedUser;
    };

    const changePassword = async (data) => {
        return await api.put("/auth/change-password", data);
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateProfile,
                isAuthenticated: !!user,
                isAdmin: user?.role === "Admin",
                changePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);