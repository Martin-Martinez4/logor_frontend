
import { FC, useEffect, useState, useContext, useRef } from "react";

import UserInfoContext from "../context/UserInfoProvider";

import { getFollowersCount, getFollowingCount, loggedIsFollower } from "../utils/fetchFollowers";

import useSigninModal from "../hooks/useModal";

import { createFollow, deleteFollow } from "../utils/fetchCreateDeleteFollow";

import { refreshTokenBool } from "../utils/tokenRefreshedBool";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import useAuth from "../hooks/useAuth";

import "./Follow.css";

const Follow:FC = ({ visiteeUser, buttonClasses, followCountClass }) => {

      const componentIsMounted = useRef(true);

    const { loggedInUser, setloggedInUser } = useContext( UserInfoContext);
    const { auth, setAuth } = useAuth();

    const [followLoading, setFollowLoading] = useState();


    const [ followerCount, setFollowerCount ] = useState({

        followers:"",
        following:""
    })

    const { showModal, toggleModal } = useSigninModal();


    const [ isFollower, setIsFollower ] = useState();

    const handleFollow = async () => {

        setFollowLoading(true);

        try{

            const refreshBool = await refreshTokenBool(auth, setAuth)
    
            if(!refreshBool){
    
    
                if(showModal){
    
                    return 
                }else{
    
                    toggleModal()
                    return
                }
    
            }
    
            await createFollow(visiteeUser.id)

            const isFollower = await loggedIsFollower(visiteeUser?.id);

            setIsFollower(isFollower)

            const followersCount =  await getFollowersCount(visiteeUser?.id)
            const followingCount =  await getFollowingCount(visiteeUser?.id)
    
            setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))

            const followersCountloggedIn =  await getFollowersCount(loggedInUser.id)
            const followingCountloggedIn =  await getFollowingCount(loggedInUser.id)

                setloggedInUser((prev) => 
                        ({...prev, 
                      followers: followersCountloggedIn,
                      following: followingCountloggedIn
                }))

        }
        catch(err){

    
    
                if(showModal){
    
                    console.error(err)
                    return 
                }else{
    
                    console.error(err)
                    toggleModal()
                    return
                }
    


        }
        finally{

            setFollowLoading(false);

        }

    }

    const handleUnfollow = async () => {

        setFollowLoading(true);


        try{
    
            const refreshBool = await refreshTokenBool(auth, setAuth)
    
            if(!refreshBool){
    
    
                if(showModal){
    
                    return 
                }else{
    
                    toggleModal()
                    return
                }
    
            }
    
            await deleteFollow(visiteeUser.id)

            const isFollower = await loggedIsFollower(visiteeUser?.id);

                        
            setIsFollower(isFollower)

            const followersCount =  await getFollowersCount(visiteeUser?.id)
            const followingCount =  await getFollowingCount(visiteeUser?.id)
    
            setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))

            const followersCountloggedIn =  await getFollowersCount(loggedInUser.id)
            const followingCountloggedIn =  await getFollowingCount(loggedInUser.id)

                setloggedInUser((prev) => 
                        ({...prev, 
                      followers: followersCountloggedIn,
                      following: followingCountloggedIn
                }))
        }
        catch(err){

            console.error(err)

        }
        finally{

            setFollowLoading(false);

        }


    }

    useEffect(() => {

        let isMounted = true; 


        const checkIfFollower = async (user_id, setIsFollower) => {

            setFollowLoading(true);

              
                const followersCount =  await getFollowersCount(user_id)
                const followingCount =  await getFollowingCount(user_id)

                if(isMounted){
                    
                    setFollowerCount(prev => ({...prev, followers: followersCount, following: followingCount}))
                }
    
                if(user_id && !(loggedInUser.username === "")){
    
                    // const isFollower = await loggedIsFollower(user_id)

                    loggedIsFollower(user_id).then( checkIsFollower => {

                        if(isMounted){
                    
                            setIsFollower(checkIsFollower)
                        }


                    })
                    .catch(err => console.error(err))
        
            
                }else{
    
                    if(isMounted){

                        setFollowLoading(false);
                    }

                    return
    
                }

                if(isMounted){

                    setFollowLoading(false);
                }

            }
           
            


        
        checkIfFollower(visiteeUser?.id, setIsFollower)

        // return () =>  {componentIsMounted.current = false}

        return () => { isMounted = false };

        
        

    },[loggedInUser, visiteeUser])

    useEffect(() => {

        let isMounted = true; 


        const checkIsFollower = async (user_id, setIsFollower) => {


                if(user_id && !(loggedInUser.username === "")){
    
                    loggedIsFollower(user_id).then( checkIsFollower => {

                        if(componentIsMounted.current){
                            
                            if(isMounted){

                                setIsFollower(checkIsFollower)
                            }

                        }


                    })
                    .catch(err => console.error(err))
        
    
                }else{
    
                    console.error("error getting follow status")
                    // setIsFollower(false)
    
                }
          



        }
        
        checkIsFollower(visiteeUser?.id, setIsFollower)

        return () => { isMounted = false };


        
    // eslint-disable-next-line   react-hooks/exhaustive-deps
    },[])

    useEffect(() => {}, [isFollower])

    return(

        <>
            <p className={followCountClass}>Followers:<em>{ followerCount?.followers? " " +followerCount?.followers: " Error"}</em></p> 
            <p className={followCountClass}>Following:<em>{followerCount?.following? " " +followerCount?.following: " Error"}</em></p>

            {visiteeUser.username === loggedInUser.username
            ?  
            " "
            :
            <LoaderHOC loading={followLoading} loader={2}>
            <div className="follow-button__container"> 
                {isFollower
                    ?
                    < button type="button" className={`button red ${buttonClasses}`} title="Click to follow" onClick={handleUnfollow} >Unfollow</button>
                    : 
                    < button type="button" className={`button primary ${buttonClasses}`} title="Click to follow" onClick={handleFollow}>Follow</button>
                }
            </div>
            </LoaderHOC>
            
                
            }

            {/* <FollowersPage user_id={visiteeUser?.id} /> */}
        </>
    )

}

export default Follow;
