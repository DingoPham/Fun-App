import {NavLink} from "react-router-dom";
import { FaUser, FaUsersCog  } from "react-icons/fa";

function Settings(){
    return(
        <div className='content_main'>
            <div className='gallery_content'>
                <NavLink to='/settings/profile'>
                    <span className="menu-icon"><FaUser /></span>
                    <span className="menu-text">Profile</span>
                </NavLink>
                <hr />
                <NavLink to='/settings/users'>
                    <span className="menu-icon"><FaUsersCog  /></span>
                    <span className="menu-text">User</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Settings