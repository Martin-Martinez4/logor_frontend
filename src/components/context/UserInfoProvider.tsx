
import  { createContext, Dispatch, FC, SetStateAction, useState } from  "react";

import { getFollowersCount, getFollowingCount } from "../utils/fetchFollowers";

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

interface UserInfoContext {
    loggedInUser?: UserInformation; 
    setloggedInUser?: Dispatch<SetStateAction<UserInformation>>; 
    loadUser?: (data: UserInformation) => Promise<void>;
    unloadUser?: () => void;
}

const UserInfoContext = createContext<UserInfoContext>({});

export const UserInfoProvider:FC = ({ children }) => {

    const [loggedInUser, setloggedInUser] = useState<UserInformation>({
        id:"",
        username:"",
        joined_date:"",
        nickname:"",
        profile_pic_url:"",
        description:"",
        header_img_url:"",
        location:"",
        links:"",
        followers:"",
        following:""
    });

    const loadUser = async (data: UserInformation) => {

        // const [id, username, joined, nickname, profile_pic_url, description, header_img_url, location, links] = data;

        if(data?.id){

            const followersCount =  await getFollowersCount(data.id)
            const followingCount =  await getFollowingCount(data.id)
            

            setloggedInUser({
                
                    id: data.id,
                    username: data.username,
                    joined_date: data.joined_date,
                    nickname: data.nickname,
                    profile_pic_url: data.profile_pic_url,
                    description: data.description,
                    header_img_url: data.header_img_url,
                    location: data.location,
                    links: data.links,
                    followers: followersCount,
                    following: followingCount
            })
        }
        else{
            return
        }
    
    
      }

    const unloadUser = async () => {

        console.log("unloading")

        setloggedInUser(prev => ({ ...prev,
                    
            id:"",
            username: "",
            joined_date: "",
            nickname: "",
            profile_pic_url: "",
            description: "",
            header_img_url: "",
            location: "",
            links: "",
            followers: "",
            following: ""
        }))


    }




  

    return (
        <UserInfoContext.Provider value={{loggedInUser, setloggedInUser, loadUser, unloadUser}}>
            { children }
        </UserInfoContext.Provider>

    )
}

export default UserInfoContext;


