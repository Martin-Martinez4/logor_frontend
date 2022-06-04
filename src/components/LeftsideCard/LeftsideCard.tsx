
import HomeIcon from "../svg/HomeIcon/HomeIcon";
import ProfileIcon from "../svg/ProfileIcon/ProfileIcon"
import Signout from "../svg/Signout/Signout";

const LeftsideCard  = () =>  {

    return(
        <>

            <div className="side_icon">
                <HomeIcon></HomeIcon>
            
            </div>
            <div className="side_icon">
                <ProfileIcon></ProfileIcon>
                {/* <span className="sidebar_text"><strong>Profile</strong></span> */}
            </div>
            {/* <div className="side_icon">
                <img 
                    src={GearIcon} alt="profile" className="sidebar_icon">
                </img>
                <span className="sidebar_text"><strong>Settings</strong></span>
            </div> */}

            <div className="side_icon">
            <Signout></Signout>
            </div>
            {/* 
            <div className="side_icon">
                <img 
                    src={PoundSign} alt="profile " className="sidebar_icon">
                </img>
                <span className="sidebar_text"><strong>Trends</strong></span>
            </div> */}
            {/* <div className="side_icon">
                <img 
                    src={HeartIcon} alt="profile" className="sidebar_icon">
                </img>
                <span className="sidebar_text"><strong>Favorites</strong></span>
            </div> */}
        </>
    )
}

export default LeftsideCard;
