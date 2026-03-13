import { PiArrowArcLeftLight } from "react-icons/pi";
import {NavLink} from "react-router-dom";

function ReturnButton(){

    return(
        <>
            <NavLink to='/gallery' className='turnback-button'>
                <PiArrowArcLeftLight />
            </NavLink>
        </>
    )
}

export default ReturnButton