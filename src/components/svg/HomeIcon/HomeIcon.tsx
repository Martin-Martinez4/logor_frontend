
import { useNavigate } from "react-router-dom";

const HomeIcon = () => {

    const navigate = useNavigate()

    const redirectHome = () => {

        return navigate(`/home/`)
    }


    return(
        <>

            {/* <img src={HomeIconSVG} alt="profile" className="sidebar_icon" onClick={redirectHome}>
            </img> */}
            <svg className="sidebar_icon" onClick={redirectHome} width="35" height="35" viewBox="0 0 20 17" fill="red" xmlns="http://www.w3.org/2000/svg">
                <path className="sidebar_icon svg_hoverable" onClick={redirectHome} d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" fill="rgba(0, 34, 51, 1)"/>
            </svg>

            <span className="sidebar_text" onClick={redirectHome}><strong>Home</strong></span>
        </>
    )

}

export default HomeIcon;