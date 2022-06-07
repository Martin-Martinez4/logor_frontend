
import "./followersPage.css";
import LoaderHOC from "../LoaderHOC/LoaderHOC";


import { createMiniProfiles } from "../utils/createMiniprofilesArray";

import { getFollowers, getFollowees } from "../utils/fetchFollowers";

import { FC, useEffect, useState } from "react"

type followersFollowees = {

    followers: any[];
    followees: any[];

}

type user_id = {

    user_id: string;
}

// const FollowersPage: FC = ({ user_id }) => {
const FollowersPage: FC<user_id> = ({ user_id }) => {

    const [ followersPageIsLoading, setFollowersPageIsLoading ] = useState<boolean>(false);

    const [ followersFollowees, setFollowersFollowees ] = useState<followersFollowees>({

        followers:[],
        followees:[]
    });


    useEffect(() => {

        ( async(user_id, setFollowersPageIsLoading, getFollowers, getFollowees, createMiniProfiles) => {

            let isMounted = true;

            setFollowersPageIsLoading(true);
            if(isMounted){

    
                const followersArray = await getFollowers(user_id);
    
                const followersMiniProfiles = createMiniProfiles(followersArray)
    
                const followeesArray = await getFollowees(user_id);
    
                const followeesMiniProfiles = createMiniProfiles(followeesArray)
    
                setFollowersFollowees(prev => ({...prev, followees: followeesMiniProfiles, followers: followersMiniProfiles }))
    
            }
            setFollowersPageIsLoading(false);
            return () => { isMounted = false };




        })(user_id, setFollowersPageIsLoading, getFollowers, getFollowees, createMiniProfiles)


    }, [ user_id, ])

    return (

        <div className="postlist_horizontal" >

                
            <LoaderHOC loading={followersPageIsLoading}>

                <div  className="followers-column">
                    <p>Following</p>
                    {followersFollowees.followees}

                </div>

                <div className="followers-column">
                    <p>Followers</p>
                    {followersFollowees.followers}

                </div>
                {/* </Card> */}


            </LoaderHOC>
           
            <div className="empty"></div>
        {/* </Scroll> */}
          
        </div>

    )

}

export default FollowersPage;

