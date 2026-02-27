import { MdSpaceDashboard, MdHome, MdInsertPhoto, MdSettings, MdArrowCircleRight, MdArrowCircleLeft } from "react-icons/md";
import {useState} from "react";
import { NavLink } from "react-router-dom"

function Sidebar() {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>

            <h3 className="sidebar-header">
                {collapsed ? <MdSpaceDashboard/> : "Dashboard"}
            </h3>

            <div className="menu">
                <NavLink to='/' className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
                    <span className="menu-icon"><MdHome /></span>
                    <span className="menu-text">Home</span>
                </NavLink>

                <NavLink to='/gallery' className="menu-item">
                    <span className="menu-icon"><MdInsertPhoto /></span>
                    <span className="menu-text">Gallery</span>
                </NavLink>

                <NavLink to='/settings' className="menu-item">
                    <span className="menu-icon"><MdSettings /></span>
                    <span className="menu-text">Settings</span>
                </NavLink>

            </div>

            <div className="menu-item close" onClick={() => setCollapsed(!collapsed)}>
                <span className="menu-icon">
                  {collapsed ? <MdArrowCircleRight/> : <MdArrowCircleLeft />}
                </span>
                <span className="menu-text">
                  Close
                </span>
            </div>
        </div>
    )
}

export default Sidebar