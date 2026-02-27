import { NavLink } from "react-router-dom"
import {MdInsertPhoto, MdOutlineOndemandVideo} from "react-icons/md";

function Gallery(){
    return(
        <div className='content_main'>
            <div className='gallery_content'>
                <NavLink to='/gallery/illustration'>
                    <span className="menu-icon"><MdInsertPhoto /></span>
                    <span className="menu-text">Illustration</span>
                </NavLink>
                <hr />
                <NavLink to='/gallery/animation'>
                    <span className="menu-icon"><MdOutlineOndemandVideo /></span>
                    <span className="menu-text">Animation</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Gallery