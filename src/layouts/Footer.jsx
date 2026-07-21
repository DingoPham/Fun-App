import { MdMail, MdCopyright } from "react-icons/md";
import facebook from "../assets/img/facebook.png"
import twitter from "../assets/img/twitter.png"
import devianart from "../assets/img/devianart.png"
import youtube from "../assets/img/youtube.png"
import github from "../assets/img/github.png"
import discord from "../assets/img/discord.png"


function Footer(){
    return(
        <div className='footer_layout'>
            <div className="footer_layout_inner">
                <div className="email-contact">
                    <h5 className='title-m'>If you have any questions, please email me: </h5>
                    <div className='email-con'>
                        <div><MdMail/></div>
                        <p>pencibambo@gmail.com</p>
                    </div>
                </div>
                <div className="social-contact">
                    <h5 className='title-m'>My other social media platforms:</h5>
                    <div className='icon-social'>
                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/dingopham.3/">
                            <img src={facebook} alt='facebook'/>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://x.com/DingoPham">
                            <img src={twitter} alt='twitter'/>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.deviantart.com/foxtall7">
                            <img src={devianart} alt='devianart'/>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@dingopham">
                            <img src={youtube} alt='youtube'/>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://github.com/DingoPham">
                            <img src={github} alt='github'/>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://discord.com/users/601287606671507466">
                            <img src={discord} alt='discord'/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer_layout_copyright">
                <div className='copyright'>Copyright <MdCopyright/> DingoPham</div>
            </div>
        </div>
    )
}

export default Footer