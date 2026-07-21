import { IoArrowBack } from "react-icons/io5";
import {NavLink} from "react-router-dom";

function ReturnButton(){

    return(
        <>
            <NavLink to='/gallery' className='turnback-button'>
                <IoArrowBack />
            </NavLink>
        </>
    )
}

export default ReturnButton