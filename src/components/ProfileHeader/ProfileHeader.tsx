
import { FC, useContext  } from "react";
import Card from "../Card/Card";
import "./ProfileHeader.css";
import { serverAddressString } from "../utils/exportGetImage"; 
import UserInfoContext from "../context/UserInfoProvider";

import Follow from "../Follow/Follow";

import { formatDateMonthDayYear } from "../utils/formatDate";


// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"

type visiteeUser = {

    id: string;
    username: string;
}


const ProfileHeader:FC = () =>{
    
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);
    const { loggedInUser } = useContext(UserInfoContext);

    // const followerComponent2 = followerComponent

    return(

        <Card classes="h_auto content profile_header">
         

         {/* <div className="profile_header_background" style={{backgroundImage: `url('${getImageString}${loggedInUser["header_img_url"]}')`}} >
                <img src={ `${getImageString}${loggedInUser["profile_pic_url"]}` } alt="profile" className="profile_header_image "></img>
            </div> */}
            <div className="profile_header_background" style={{
                backgroundImage: `url(${serverAddressString}${loggedInUser && loggedInUser["header_img_url"]})`,
                backgroundRepeat:" no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} >

                <img src={ `${serverAddressString}${loggedInUser && loggedInUser["profile_pic_url"]}`} alt="profile" className="profile_header_image "></img>
            </div>

            <div className="profile_header_container">


                <h3 className="profile_name">{loggedInUser && loggedInUser["username"]}</h3>
                

                <h4 className="profile_tag"><em>{loggedInUser && loggedInUser["nickname"]}</em></h4>
                <p className="profile_description">{loggedInUser && loggedInUser["description"]}</p>

                <div className="profile_other">
                    {/* <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser && loggedInUser["location"]}</em></p> */}


                    {loggedInUser && loggedInUser["location"] === ""
                        ?<p></p>
                        : 
                        <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{loggedInUser && loggedInUser["location"]}</em></p>
                    }
                    {loggedInUser && loggedInUser["links"] === ""
                        ?<p></p>
                        : 
                        <p><img src={LinkIcon} alt="profile" className="profile_icon link_icon"></img><a href={loggedInUser && loggedInUser["links"]}><em>{loggedInUser && loggedInUser["links"]}</em></a></p>
                    }

                    <p><img src={CalenderIcon} alt="profile" className="profile_icon"></img><em>{formatDateMonthDayYear(loggedInUser ? loggedInUser["joined_date"] : "")}</em></p>

                </div>

                <div className="profile_other profile_following">
                  
                    <Follow visiteeUser={loggedInUser as visiteeUser} buttonClasses={"hidden"} ></Follow>
                </div>

            </div>

        </Card>

    )

}

export default ProfileHeader

