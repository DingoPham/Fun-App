import {useState} from "react";
import {FaEnvelope, FaUserCircle, FaUserShield, FaUser } from "react-icons/fa";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { useToast } from "../../context/ToastContext";

function Profile() {
    const { user, logout, isAuthenticated, updateProfile, changePassword } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: ""
    });
    const { success, error, warning } = useToast();
    const handleLogout = async () => {
        await logout();
        success("Logout successful!");
        navigate("/login", { replace: true });
    };
    const handleEdit = () => {
        setChangingPassword(false);
        setForm({
            username: user.username,
            email: user.email
        });
        setEditing(true);
    };
    const handleSave = async () => {
        try {
            await updateProfile(form);
            success("Save successful!");
            setEditing(false);
        }
        catch (err) {
            error(err.message);
        }
    };
    const handleToggleChangePassword = () => {
        setEditing(false);
        setChangingPassword(prev => !prev);
    };
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const handleChangePassword = async () => {
        if (
            passwordForm.newPassword !== passwordForm.confirmPassword
        ) {
            warning("Password confirmation does not match...");
            return;
        }
        try {
            await changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            success("Password changed successfully!");
            setChangingPassword(false);
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (err) {
            error(err.message);
        }
    };
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-header">
                    <FaUserCircle className="profile-avatar"/>
                    <div>
                        <h2>{user?.username}</h2>
                        <p>{user?.role}</p>
                    </div>
                </div>
                {!changingPassword ? (
                    <div className="profile-body">
                        <div className="profile-row">
                            <FaUser />
                            <div className="profile-row-container">
                                <label>Username</label>
                                {editing ? (
                                    <input
                                        className="profile-edit-input"
                                        value={form.username}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                username: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    <p>{user?.username}</p>
                                )}
                            </div>
                        </div>
                        <div className="profile-row">
                            <FaEnvelope />
                            <div className="profile-row-container">
                                <label>Email</label>
                                {editing ? (
                                    <input
                                        className="profile-edit-input"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    <p>{user?.email}</p>
                                )}
                            </div>
                        </div>
                        <div className="profile-row">
                            <FaUserShield />
                            <div>
                                <label>Role</label>
                                <p>{user?.role}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="password-section">
                        <div className="profile-row profile-row-change">
                            <label>Current password</label>
                            <input placeholder="Enter your old password" className="profile-edit-input" type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}/>
                        </div>
                        <div className="profile-row profile-row-change">
                            <label>New password</label>
                            <input placeholder="Enter your new password" className="profile-edit-input" type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}/>
                        </div>
                        <div className="profile-row profile-row-change">
                            <label>Confirm password</label>
                            <input placeholder="Re enter your new password" className="profile-edit-input" type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}/>
                        </div>
                    </div>
                )}
                <div className="profile-footer">
                    {editing ? (

    <>
        <button onClick={handleSave}>
            Save profile
        </button>

        <button
            className="secondary"
            onClick={() => setEditing(false)}
        >
            Cancel
        </button>
    </>

) : changingPassword ? (

    <>
        <button onClick={handleChangePassword}>
            Save password
        </button>

        <button
            className="secondary"
            onClick={handleToggleChangePassword}
        >
            Cancel
        </button>
    </>

) : (

    <>
        <button onClick={handleEdit}>
            Edit profile
        </button>

        <button
            className="secondary"
            onClick={handleToggleChangePassword}
        >
            Change password
        </button>
    </>

)}
                    {isAuthenticated && (
                        <button className="third" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;