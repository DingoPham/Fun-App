import { FaUserCircle, FaEnvelope, FaUserShield } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";


function Profile() {

    const { user } = useAuth();

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

                            <span>{user?.username}</span>

                        </div>

                    </div>

                    <div className="profile-row">

                        <FaEnvelope />

                        <div>

                            <label>Email</label>

                            <span>
                                {user?.email ?? "Not available"}
                            </span>

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

                <div className="profile-footer">

                    <button>
                        Edit Profile
                    </button>

                    <button className="secondary">
                        Change Password
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;