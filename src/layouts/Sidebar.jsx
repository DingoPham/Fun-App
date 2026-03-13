import { MdSpaceDashboard, MdHome, MdInsertPhoto, MdSettings, MdArrowCircleRight, MdArrowCircleLeft, MdKeyboardArrowDown, MdOutlineOndemandVideo } from "react-icons/md";
import { RiGalleryView2 } from "react-icons/ri";
import {useState} from "react";
import { NavLink } from "react-router-dom"

function Sidebar() {
    const [collapsed, setCollapsed] = useState(true)
    const [openMenu, setOpenMenu] = useState(null)

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

                <div className='submenu-group'>
                    <NavLink to='/gallery' className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
                        <span className="menu-icon"><RiGalleryView2 /></span>
                        <span className="menu-text">Gallery</span>
                    </NavLink>
                    {!collapsed && (
                        <span
                            className={`submenu-arrow ${openMenu === 'gallery' ? 'rotate' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpenMenu(openMenu === 'gallery' ? null : 'gallery')}}
                        >
                            <MdKeyboardArrowDown />
                        </span>
                    )}
                </div>
                {openMenu === "gallery" && !collapsed && (
                    <div className="submenu">
                        <NavLink to="/gallery/illustration" className={({isActive}) => isActive ? "submenu-item active" : "submenu-item"}>
                            <span className="menu-icon"><MdInsertPhoto /></span>
                            <span className="menu-text">Illustration</span>
                        </NavLink>

                        <NavLink to="/gallery/animation" className={({isActive}) => isActive ? "submenu-item active" : "submenu-item"}>
                            <span className="menu-icon"><MdOutlineOndemandVideo /></span>
                            <span className="menu-text">Animation</span>
                        </NavLink>
                    </div>
                )}

                <div className='submenu-group'>
                    <NavLink
                        to='/settings'
                        className={({isActive}) => isActive ? "menu-item active" : "menu-item"}
                    >
                        <span className="menu-icon"><MdSettings /></span>
                        <span className="menu-text">Settings</span>
                    </NavLink>

                    {!collapsed && (
                        <span
                            className={`submenu-arrow ${openMenu === 'settings' ? 'rotate' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpenMenu(openMenu === 'settings' ? null : 'settings')
                            }}
                        >
                            <MdKeyboardArrowDown />
                        </span>
                    )}
                </div>
                {openMenu === "settings" && !collapsed && (
                    <div className="submenu">
                        <NavLink
                            to="/settings/profile"
                            className={({isActive}) => isActive ? "submenu-item active" : "submenu-item"}
                        >
                            <span className="menu-text">Profile</span>
                        </NavLink>
                        <NavLink
                            to="/settings/users"
                            className={({isActive}) => isActive ? "submenu-item active" : "submenu-item"}
                        >
                            <span className="menu-text">Users</span>
                        </NavLink>
                    </div>
                )}
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