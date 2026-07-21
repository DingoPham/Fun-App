import {useState} from "react";
import {FaEnvelope, FaUserCircle, FaUserShield} from "react-icons/fa";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Profile() {
    const { user, logout, isAuthenticated, updateProfile, changePassword } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: ""
    });

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };
    const handleEdit = () => {

        setForm({
            username: user.username,
            email: user.email
        });
        setEditing(true);
    };
    const handleSave = async () => {
        await updateProfile(form);
        setEditing(false);
    };

    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const handleChangePassword = async () => {

        if (
            passwordForm.newPassword !==
            passwordForm.confirmPassword
        ) {
            alert("Xác nhận mật khẩu không khớp.");
            return;
        }

        try {

            await changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });

            alert("Đổi mật khẩu thành công.");

            setChangingPassword(false);

            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (err) {

            alert(err.message);

        }
    };

    return (

        <div className="profile-page">
            <div className="profile-card">

                <div className="profile-header">

                    <FaUserCircle className="profile-avatar"/>

                    <div>

                        <h2>{user?.username}</h2>

                        <p>
                            {user?.role}
                        </p>

                    </div>

                </div>

                <div className="profile-body">

                    <div className="profile-row">

                        <FaUserShield />

                        <div>

                            <label>Username</label>

                            {editing ? (

                                <input
                                    value={form.username}
                                    onChange={(e)=>
                                        setForm({
                                            ...form,
                                            username:e.target.value
                                        })
                                    }
                                />

                            ) : (

                                <span>{user?.username}</span>

                            )}

                        </div>

                    </div>

                    <div className="profile-row">

                        <FaEnvelope />

                        <div>

                            <label>Email</label>

                            {editing ? (

                                <input
                                    value={form.email}
                                    onChange={(e)=>
                                        setForm({
                                            ...form,
                                            email:e.target.value
                                        })
                                    }
                                />

                            ) : (

                                <span>{user?.email}</span>

                            )}

                        </div>

                    </div>

                    <div className="profile-row">

                        <FaUserShield />

                        <div>

                            <label>Role</label>

                            <span>{user?.role}</span>

                        </div>

                    </div>

                </div>
                {changingPassword && (

                    <div className="password-section">

                        <div className="profile-row">

                            <label>Current Password</label>

                            <input
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e)=>
                                    setPasswordForm({
                                        ...passwordForm,
                                        currentPassword:e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="profile-row">

                            <label>New Password</label>

                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e)=>
                                    setPasswordForm({
                                        ...passwordForm,
                                        newPassword:e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="profile-row">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e)=>
                                    setPasswordForm({
                                        ...passwordForm,
                                        confirmPassword:e.target.value
                                    })
                                }
                            />

                        </div>

                        <button onClick={handleChangePassword}>
                            Save Password
                        </button>

                    </div>

                )}
                <div className="profile-footer">

                    {editing ? (
                        <>
                            <button onClick={handleSave}>
                                Save
                            </button>

                            <button
                                className="secondary"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEdit}>
                                Edit Profile
                            </button>

                            <button
                                className="secondary"
                                onClick={() =>
                                    setChangingPassword(!changingPassword)
                                }
                            >
                                Change Password
                            </button>
                        </>
                    )}

                    {isAuthenticated && (
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </div>

    );

}

export default Profile;