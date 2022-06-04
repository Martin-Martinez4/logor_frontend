
import { FC, useContext, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { createMiniProfiles } from "../utils/createMiniprofilesArray";
import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";

import Scroll from "../Scroll/Scroll";

import UserNotFound from "../UserNotFound/UserNotFound";

import Card from "../Card/Card";
import VisitorPost from "../Posts/VisitorPost";

import VisitorProfileHeader from "../ProfileHeader/VisitorProfileHeader";

import NoPosts from "../NoPosts/NoPosts";

import UserInfoContext from "../context/UserInfoProvider";


import "./postlist.css"

const VisitorPostList: FC = ({ userOrTagID }) => {


     const location = useLocation();

 
     // eslint-disable-next-line
     const { loggedInUser } = useContext( UserInfoContext);


     const [userPosts, setUserPosts] = useState();

     const [postsArray, setPostsArray] = useState();

     const postIncrement = 10
 
     const [lastPostShown , setLastPostShown] = useState(postIncrement)

     const CreatePostList = (comments, postIncrement) => {

        console.log("comments: ",createPosts(comments))
                    
                    
        setPostsArray(createPosts(comments))

        // console.log("postArray: ", postsArray)

        let start = 0;
        let howMany = postIncrement;

        let extractedArr = postsArray?.filter((item, index)=>{
            return index >= start && index < howMany + start ;
        })


        setUserPosts(extractedArr)
        setLastPostShown(postIncrement)

     }

     const addMorePostsToUserPosts = (comments, incrementBy) => {

        setPostsArray(createPosts(comments))
    
        // console.log(postsArray)

        if(lastPostShown < postsArray?.length ){
    
            const lastNewPostIndex = lastPostShown? lastPostShown + incrementBy: incrementBy

            console.log(lastNewPostIndex)
    
            setLastPostShown(lastNewPostIndex)
    
            setUserPosts(postsArray?.slice(0,lastNewPostIndex))

        
        }
        else{
            
            return
            
        }

     }

     useEffect(() => {


    }, [loggedInUser])


     // Get user comments
     const createPosts = (commentsArray) => {
         
         let posts = []
 
 
         for(let i = 0; i < commentsArray.length; i++ ){
 
             let loggedInComments = commentsArray[i]
             
             
             const {username, comment_id, text_content, created_at, status, nickname, profile_pic_url} = loggedInComments

                 
                 
             if(loggedInComments.hasOwnProperty("comment_id")){
 
 
                     posts.push( <VisitorPost key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} userPosts={userPosts} setUserPosts={setUserPosts} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={status}  /> );
 
                 
             }
             
         }
 
 
         return posts
     }

     useEffect(() => {

        //  setUserPosts(undefined)
         
         let isMounted = true;   
         const setVisitorPosts = async () => {

            
            if (location.pathname.includes("/tags/name/")){
    
                // fetch data from tags table with id after /tags/
                //  SELECT * FROM tag_comment JOIN comments ON comments.comment_id = tag_comment.comment_id jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;
    
    
                fetch(`http://localhost:3001/tags/byName/${userOrTagID}`, {
                    method: "get",
                    headers:  {"Content-Type": "application/json"},
                }).then(response => response.json())
                .then(comments => {
                    if (isMounted){
    
                        // setUserPosts(createPosts(comments))
                        CreatePostList(comments, 10)
                    }
                })
            }
    
        
            else if(location.pathname.includes("/users/nickname/")){
    
    
                await fetch(`http://localhost:3001/users/byNickname/${userOrTagID}`, {
                    method: "get",
                    headers:  {"Content-Type": "application/json"},
                }).then(response => response.json())
                .then(comments => {

                    CreatePostList(comments, 10)
    
                })
            }
            else if(location.pathname.includes("/users/")){
    
             
    
                fetch(`http://localhost:3001/users/${userOrTagID}`, {
                    method: "get",
                    headers:  {"Content-Type": "application/json"},
                }).then(response => response.json())
                .then(comments => {
                    if (isMounted){
    
                        setUserPosts(createPosts(comments))
                    }
                })
    
    
            }
            else if (location.pathname.includes("/tags/")){
    
                // fetch data from tags table with id after /tags/
                //  SELECT * FROM tag_comment JOIN comments ON comments.comment_id = tag_comment.comment_id jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;
    
    
                fetch(`http://localhost:3001/tags/${userOrTagID}`, {
                    method: "get",
                    headers:  {"Content-Type": "application/json"},
                }).then(response => response.json())
                .then(comments => {
                    if (isMounted){
    
                        setUserPosts(createPosts(comments))
                    }
                })
    
    
            }
            else if (location.pathname.includes("/comment/thread/")){
    
                // recursive fetch
                // .then => setUserpost(createPosts(comments))
    
                
    
            }
     
        }

        
        setVisitorPosts()
        return () => { isMounted = false };
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userOrTagID])

     useEffect(() => {

    
        // setUserPosts(postsArray?.slice(0,lastPostShown))

        setUserPosts(postsArray?.slice(0,lastPostShown))


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postsArray])

     const [ suggestedProfiles, setSuggestedProfiles ] = useState();

     let miniprofilesArray = [];
 
     const seeMorePosts = async () => {

        if (location.pathname.includes("/tags/name/")){

            await fetch(`http://localhost:3001/tags/byName/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {

                    addMorePostsToUserPosts(comments, 10)
            })
        }
        else if(location.pathname.includes("/users/nickname/")){

    
            await fetch(`http://localhost:3001/users/byNickname/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then(comments => {
                
                addMorePostsToUserPosts(comments, 10)
               
            
            })

        }
        else if(location.pathname.includes("/users/")){
    
             
    
            fetch(`http://localhost:3001/users/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
                
                addMorePostsToUserPosts(comments, 10)
            })


        }
        else if (location.pathname.includes("/tags/")){

            // fetch data from tags table with id after /tags/
            //  SELECT * FROM tag_comment JOIN comments ON comments.comment_id = tag_comment.comment_id jOIN user_headers ON comments.user_id = user_headers.user_id WHERE tag_id = '849998ef-e4b6-48ce-aa0d-7bbef2ee1995' ORDER BY comments.created_at;


            fetch(`http://localhost:3001/tags/${userOrTagID}`, {
                method: "get",
                headers:  {"Content-Type": "application/json"},
            }).then(response => response.json())
            .then(comments => {
               
                addMorePostsToUserPosts(comments, 10)


            })

        }
    }


     // get three random user_ids
     useEffect(() => {
 
         (async (setSuggestedProfiles) => {
 
             const featuredUsers = await getRandomUserIDs(4);
 
 
             setSuggestedProfiles(featuredUsers)
 
             
         })(setSuggestedProfiles)
         
         
     }, [])
     

     useEffect(() => {

     }, [userPosts])
 
     miniprofilesArray = createMiniProfiles(suggestedProfiles);
 
 
     
    //  let posts = userPosts
    
        return(
            
            <div className="postlist_horizontal" >
            <Scroll>

                {location.pathname.includes("/users/")?
                <VisitorProfileHeader userOrTagID={userOrTagID} />:""
                }
                
                <Card classes="content med_suggestion">
                    <p>Suggestions</p>
                    <div className="suggestions">

                        <p>#DonkeyKong</p>
                        <p>#ApeEscape</p>
                        <p>#MelGibbonson</p>
                    </div>
                    <p>Featured</p>
                    <div className="features">
                        {miniprofilesArray}

                    </div>
                </Card>
                {userPosts === undefined?<UserNotFound/>:userPosts.length > 0?userPosts: <NoPosts />}
                <div onClick={seeMorePosts}className={lastPostShown >= postsArray?.length? "hidden" : "posts-see_more"}>See More &#8658;</div>
               
                {/* White  space at the end of the scroll section */}
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default VisitorPostList;

