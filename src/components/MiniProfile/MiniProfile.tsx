
import { FC, useEffect, useState, useContext, useRef, Dispatch, SetStateAction } from "react";

import "./MiniProfile.css";
import { serverAddressString } from "../utils/exportGetImage"; 

import UserInfoContext from "../context/UserInfoProvider";

import { getMiniProfileInfo } from "../utils/fetchMiniprofileInfo";
import { loggedIsFollower } from "../utils/fetchFollowers";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Follow from "../Follow/Follow";

interface UserInformation {
    id: string;
    username: string;
    joined_date: string;
    nickname: string;
    profile_pic_url: string;
    description: string;
    header_img_url: string;
    location: string;
    links: string;
    followers: string;
    following: string;

}

type user_id = {

    user_id: string;
}


const MiniProfile:FC<user_id> = ({ user_id }) => {

    const mountedRef = useRef(true)

    const [ miniProfileUser, setMiniProfileUser] = useState<UserInformation>()

    const [followStatusLoading, setFollowStatus] = useState<boolean>(false);

    const { loggedInUser } = useContext( UserInfoContext);

    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const [ isFollower, setIsFollower ] = useState();

    useEffect(() => {

        (async (user_id, setIsFollower) => {

            setFollowStatus(true)

            const isFollower = await loggedIsFollower(user_id);

            setIsFollower(isFollower)

            setFollowStatus(false)


        })(user_id, setIsFollower)
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loggedInUser])

    useEffect(() => {

        let isMounted = true;
        
        const initMinprofile = async (setMiniProfileUser: Dispatch<SetStateAction<UserInformation>>, user_id :string) => {

            if(isMounted){

                setFollowStatus(true)
            }


            if(mountedRef.current){

                const userMiniprofileInfo  = await getMiniProfileInfo(user_id)
    
                if(isMounted){

                    setMiniProfileUser(userMiniprofileInfo[0]);
                }
    
            }
            else{

                return
            }

            if(isMounted){

                setFollowStatus(false)
            }


        }
        
        initMinprofile(setMiniProfileUser as Dispatch<SetStateAction<UserInformation>>, user_id)

        return () => { isMounted = false;};

    }, [user_id])

   
    useEffect(() => {
        return () => { 
          mountedRef.current = false
        }
      }, [])

    return(
        <div className="miniProfile">
            <img src={`${serverAddressString}${miniProfileUser?.profile_pic_url}`} alt="Monkey 2" className="profilePicture" />
            <div className="profileName">
                <a className="miniProfile_link" href={`/users/nickname/` + (miniProfileUser?.nickname? miniProfileUser?.nickname.substring(1,): "")}>
                    <p><strong>{miniProfileUser?.username}</strong></p>
                    <p><em>{miniProfileUser?.nickname}</em></p>
                </a>

                <LoaderHOC loading={followStatusLoading} loader={2}>

                    <Follow visiteeUser={{id: user_id, username: miniProfileUser ? miniProfileUser?.username : "N/A" }} buttonClasses={"profileName__button"} followCountClass={"hidden"}/>
                </LoaderHOC>
            </div>
        </div>
    )
}

export default MiniProfile



