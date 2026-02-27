import { MdSpaceDashboard, MdHome, MdInsertPhoto, MdSettings, MdArrowCircleRight, MdArrowCircleLeft } from "react-icons/md";
import {useState} from "react";

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>

            <h3 className="sidebar-header">
                {collapsed ? <MdSpaceDashboard/> : "Dashboard"}
            </h3>

            <div className="menu">

                <div className="menu-item">
                    <span className="menu-icon"><MdHome /></span>
                    <span className="menu-text">Dashboard</span>
                </div>

                <div className="menu-item">
                    <span className="menu-icon"><MdInsertPhoto /></span>
                    <span className="menu-text">Products</span>
                </div>

                <div className="menu-item">
                    <span className="menu-icon"><MdSettings /></span>
                    <span className="menu-text">Settings</span>
                </div>

            </div>

            <div className="menu-item" onClick={() => setCollapsed(!collapsed)}>
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