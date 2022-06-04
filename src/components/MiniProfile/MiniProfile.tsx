
import { FC, useEffect, useState, useContext, useRef } from "react";

import "./MiniProfile.css";
import { serverAddressString } from "../utils/exportGetImage"; 

import UserInfoContext from "../context/UserInfoProvider";

import { getMiniProfileInfo } from "../utils/fetchMiniprofileInfo";
import { loggedIsFollower } from "../utils/fetchFollowers";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Follow from "../Follow/Follow";


const MiniProfile:FC = ({ user_id }) => {

    const mountedRef = useRef(true)

    const [ miniProfileUser, setMiniProfileUser] = useState()

    const [followStatusLoading, setFollowStatus] = useState();

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
        
        const initMinprofile = async (setMiniProfileUser, user_id) => {

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
        
        initMinprofile(setMiniProfileUser, user_id)

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

                    <Follow visiteeUser={{id: user_id}} buttonClasses={"profileName__button"} followCountClass={"hidden"}/>
                </LoaderHOC>
            </div>
        </div>
    )
}

export default MiniProfile



