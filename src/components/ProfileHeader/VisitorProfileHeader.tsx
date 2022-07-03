
import { serverAddressString } from "../utils/exportGetImage";

import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import "./ProfileHeader.css";

import UserInfoContext from "../context/UserInfoProvider";

import PageNotFound from "../404Page/PageNotFound";

import UserNotFound from "../UserNotFound/UserNotFound";

import { formatDateMonthDayYear } from "../utils/formatDate";

import { getUserIdByNickname } from "../utils/fetchUserData";

import { getFollowersCount, getFollowingCount } from "../utils/fetchFollowers";

import Follow from "../Follow/Follow";

// import ProfileImage from "../../assets/Monkey_1.svg";
import LocationIcon from "../../assets/LocationIcon.svg"
import LinkIcon from "../../assets/LinkIcon.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"

type userOrTagID = {

    userOrTagID: string
}

type visiteeUser = {
    id: string;
    username:string;
    nickname:string;
    profile_pic_url:string;
    header_img_url:string;
    joined_date:string;
    description:string;
    location:string;
    links:string;
    followers:string;
    following:string;


}


const VisitorProfileHeader:FC<userOrTagID> = ({ userOrTagID }) =>{

    const location = useLocation();

    const [undefUser, setUndefUser] = useState(false)
    
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const { loggedInUser } = useContext( UserInfoContext);

    const [visiteeUser, setVisiteeUser] = useState<visiteeUser>({
        id: "",
        username:"",
        nickname:"",
        profile_pic_url:"",
        header_img_url:"",
        joined_date:"",
        description:"",
        location:"",
        links:"",
        followers:"",
        following:""


    })

    useEffect(() => {

    }, [loggedInUser])

    useEffect(() => {

        const fetchUserData = async (userOrTagID: string, setVisiteeUser: Dispatch<SetStateAction<visiteeUser>>) => {


        if(location.pathname.includes("/users/nickname/")){
            

            try{

                await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/usersInfo/byNickname/${userOrTagID}`, {
                    method: "get",
                    headers: { "Content-Type": "application/json"},
                }).then(response => response.json())
                .then(userInfo => {
        

                    if(userInfo[0] === undefined){

                        setUndefUser(true)
                        
                    }else{

                         setVisiteeUser((prev) => 
                                ({...prev, 
                                id: userInfo[0].id,
                                username:userInfo[0].username,
                                nickname:userInfo[0].nickname,
                                profile_pic_url:userInfo[0].profile_pic_url,
                                header_img_url:userInfo[0].header_img_url,
                                joined_date:userInfo[0].joined_date,
                                description:userInfo[0].description,
                                location:userInfo[0].location,
                                links:userInfo[0].links
                        }))
                    }
                 
                })

                const userID = await getUserIdByNickname(userOrTagID)


                const followersCount =  await getFollowersCount(userID)
                const followingCount =  await getFollowingCount(userID)


                setVisiteeUser((prev) => 
                        ({...prev, 
                      followers: followersCount,
                      following: followingCount
                }))

                


            }
            catch{

                return <PageNotFound />;
            }



        }
        else{


            await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/usersInfo/${userOrTagID}`, {
                method: "get",
                headers: { "Content-Type": "application/json"},
            }).then(response => response.json())
            .then(userInfo => {
    
             
                if(userInfo[0] === undefined){


                    setUndefUser(true)
                        
                }else{

                    setVisiteeUser((prev) => 
                            ({...prev, 
                            id: userInfo[0].id,
                            username:userInfo[0].username,
                            nickname:userInfo[0].nickname,
                            profile_pic_url:userInfo[0].profile_pic_url,
                            header_img_url:userInfo[0].header_img_url,
                            joined_date:userInfo[0].joined_date,
                            description:userInfo[0].description,
                            location:userInfo[0].location,
                            links:userInfo[0].links
                    }))
                }
            })


            const followersCount =  await getFollowersCount(userOrTagID)
            const followingCount =  await getFollowingCount(userOrTagID)

            setVisiteeUser((prev) => 
                    ({...prev, 
                  followers: followersCount,
                  following: followingCount
            }))
        }

        
    }
    
    fetchUserData(userOrTagID, setVisiteeUser)

    // eslint-disable-next-line  react-hooks/exhaustive-deps
    },[])

    return(

        <Card classes="h_auto content profile_header">

            {undefUser? <UserNotFound />
            :
                <>
                <div className="profile_header_background" style={{backgroundImage: `url('${serverAddressString}${visiteeUser.header_img_url}')`}} >
                    <img src={ `${serverAddressString}${visiteeUser.profile_pic_url}` } alt="profile" className="profile_header_image "></img>
                </div>

                <div className="profile_header_container">


                    <h3 className="profile_name">{ visiteeUser.username }</h3>
                    

                    <h4 className="profile_tag"><em>{ visiteeUser.nickname }</em></h4>
                    <p className="profile_description">{ visiteeUser.description }</p>

                    <div className="profile_other">


                        {visiteeUser.location === ""
                            ?<p></p>
                            : 
                            <p><img src={LocationIcon} alt="profile" className="profile_icon location_icon"></img> <em>{ visiteeUser.location }</em></p>
                        }
                        { visiteeUser.links === ""
                            ?<p></p>
                            : 
                            <p><img src={LinkIcon} alt="profile" className="profile_icon link_icon"></img><a href={ visiteeUser.links }><em>{ visiteeUser.links}</em></a></p>
                        }

                        <p><img src={CalenderIcon} alt="profile" className="profile_icon"></img><em>{ formatDateMonthDayYear(visiteeUser.joined_date) }</em></p>

                    </div>

                    <div className="profile_other profile_following">
                        
                        <Follow visiteeUser={{id: visiteeUser.id ? visiteeUser.id: "", username: visiteeUser.username}}  buttonClasses={"profileName__button"} />
                    </div>


                </div>
                </>
            }
         

          

        </Card>

    )

}

export default VisitorProfileHeader;

