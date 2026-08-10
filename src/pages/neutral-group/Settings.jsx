import { NavLink } from "react-router-dom";
import { FaUser, FaUsersCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Settings() {

    const { isAuthenticated, isAdmin } = useAuth();

    return (
        <div className="content_main">
            <div className="gallery_content">
                {!isAuthenticated && (
                    <>
                        <NavLink to="/login">
                            Login
                        </NavLink>

                        <hr />

                        <NavLink to="/register">
                            Register
                        </NavLink>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <NavLink to="/settings/profile">
                            <span className="menu-icon">
                                <FaUser />
                            </span>

                            <span className="menu-text">
                                Profile
                            </span>
                        </NavLink>

                        <hr />
                    </>
                )}

                {/* Chỉ Admin */}
                {isAdmin && (
                    <NavLink to="/settings/users">
                        <span className="menu-icon">
                            <FaUsersCog />
                        </span>

                        <span className="menu-text">
                            User Management
                        </span>
                    </NavLink>
                )}

            </div>
        </div>
    );
}

export default Settings;