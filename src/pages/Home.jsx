import banner from "../assets/img/banner.png"
function Home(){
    return(
        <div className='content_main'>
            <h3>Welcome, Guest</h3>
            <h3>Welcome back, Master</h3>
            <img src={banner} alt='banner' className='banner_content'/>
        </div>
    )
}

export default Home