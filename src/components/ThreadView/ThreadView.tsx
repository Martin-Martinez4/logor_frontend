
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getResponsesPosts } from "../utils/fetchPostsPromise";

import UserInfoContext from "../context/UserInfoProvider";
import TopBar from "../TopandBottom/TopBar";
import Card from "../Card/Card";
import SideCard from "../SideCards/SideCard";
import CommnetBox from "../CommentBox/CommentBox";
import Scroll from "../Scroll/Scroll";
import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";
import { createMiniProfiles } from "../utils/createMiniprofilesArray";

import LeftsideCard from "../LeftsideCard/LeftsideCard";

import VisitorPost from "../Posts/VisitorPost";
import RecursiveVisitorPost from "../Posts/RecursiveVisitorPost";

const ThreadView = () => {

    const { comment_id } = useParams();

    const [headerComment, setHeaderComment] = useState()

    // const [postsArray, setPostsArray] = useState();
    const [responsesArray, setResponsesArray] = useState();
 
    const [ suggestedProfiles, setSuggestedProfiles ] = useState();
    const [lastResponseShown , setLastResponseShown] = useState(10)
    const [userResponses, setUserResponses] = useState();

    const [ postlistLoading, setPostlistLoading ] = useState();

    const [seeMoreLoading, setSeeMoreLoading] = useState();

    const [allComments, setAllComments] = useState();
    
    
    // eslint-disable-next-line
    const { loggedInUser } = useContext( UserInfoContext);

    // Get user comments
    const createPosts = (commentsArray, allComments) => {
        
        let posts = []

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i] 
            
            const {comment_id, text_content, created_at, status, likes, username, nickname, profile_pic_url} = loggedInComments;                
                
            if(loggedInComments.hasOwnProperty("comment_id")){

                posts.push( <RecursiveVisitorPost key={`post_${comment_id}`} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} userPosts={userResponses} setUserPosts={setUserResponses} loggedInComments={responsesArray} status={status} likes={likes} allComments={allComments} padding={0}/> );

                
            }
            
        }


        return posts
    }

    useEffect(() => {

        const makePostlist = async (allComments) => {

            await fetch(`http://localhost:3001/responses/${comment_id}`, {
                        method: "get",
                        credentials:'include',
                            cache:'no-cache',
                            headers: {
                                
                                'Content-Type': 'application/json',
                              },
                    }).then(response => response.json())
                    .then(comments => {
                        
        
                        setResponsesArray(createPosts(comments, allComments))
    
        
                        let start = 0;
                        let howMany = 10;
        
                        let extractedArr = responsesArray?.filter((item, index)=>{
                            return index >= start && index < howMany + start ;
                        })
    
        
                        setUserResponses(extractedArr)
                        setLastResponseShown(10)
        
                        setPostlistLoading(false)
                    })
                   
                
        }

        const setInitPosts = async() => {

                setPostlistLoading(true)

                await fetch(`http://localhost:3001/responses/recursive/${comment_id}`, {
                    method: "get",
                    credentials:'include',
                        cache:'no-cache',
                        headers: {
                            
                            'Content-Type': 'application/json',
                        },
                }).then(response => response.json())
                .then(async comments => {

                    console.log({comments})
                    
                    setAllComments(comments)

                    return makePostlist(comments)
            })
        }
        


        setInitPosts()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser.id, comment_id])

 


    useEffect(() => {

        const getPostInformation = async (comment_id) => {
    
            // uuid, userName, nickname, user_profile, date_posted, text_content, status
            // /post/:id
    
            await fetch(`http://localhost:3001/post/${comment_id}`, {
                method: "get",
                credentials:'include',
                    cache:'no-cache',
                    headers: {
                        
                        'Content-Type': 'application/json',
                      },
            }).then(response => response.json())
            .then(comments => {
    
                const {comment_id, text_content, created_at, status, likes, username, nickname, profile_pic_url} = comments[0];
    
                setHeaderComment(
                    [<VisitorPost key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} status={ status} likes={likes} /> ]
                );
    
                
            })
    
    
        }
        

        getPostInformation(comment_id)

    }, [comment_id])



    let miniprofilesArray = [];


    useEffect(() => {
 
        (async (setSuggestedProfiles) => {

            const featuredUsers = await getRandomUserIDs(4);


            setSuggestedProfiles(featuredUsers)

            
        })(setSuggestedProfiles)
        
        
    }, [])
 

    miniprofilesArray = createMiniProfiles(suggestedProfiles);

    return(

        <div>
            <TopBar></TopBar>
        <div className="contentArea">
            
  
            <SideCard side="leftSide">
                <LeftsideCard></LeftsideCard>

            </SideCard>
            <div>

            <div className="hiddenOnLandscapeScreen914px">
                {headerComment}
            </div>
            {/* <CommnetBox createPosts={createPosts} setPostsArray={setPostsArray} parent_id={comment_id}></CommnetBox> */}
            <div className="postlist_horizontal" >
            <Scroll>

            {/* hidden hiddenOnPortraitScreen914px have to be in this order for the desired effect */}
            <div className="hidden hiddenOnPortraitScreen914px">
                {headerComment}
            </div>

            <Card classes="h_auto content profile_header">
            <CommnetBox createPosts={createPosts} setPostsArray={setResponsesArray} postListFetchFunction={() => getResponsesPosts(comment_id)} parent_id={comment_id}></CommnetBox>
                </Card>
                    
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
                {/* {userPosts === undefined?<UserNotFound/>:userPosts.length > 0?userPosts: <NoPosts />}
                <div onClick={seeMorePosts}className={lastPostShown >= postsArray?.length? "hidden" : "posts-see_more"}>See More &#8658;</div>
                */}
                {/* White  space at the end of the scroll section */}
                {/* {userResponses} */}
                {
                     responsesArray?.filter((item, index)=>{
                        return index >= 0 && index < lastResponseShown + 0 ;
                    })
                }
                

                <div className="empty"></div>
                <div className="empty"></div>
                <div className="empty"></div>
              
            </Scroll>
              
            </div>
            </div>
            <SideCard side="rightSide" >
                <h3 className="header">Suggestions</h3>
                <p className="rightSide_content suggestion_content">#returnToMonkey</p>
                <p className="rightSide_content suggestion_content">#DonkeyKong</p>

                <h3 className="header">Featured</h3>

               
                <div className="rightSide_content featured_content">
                    
                    {miniprofilesArray}
                </div>
                       
            </SideCard> 
        </div>
        </div>


        // header Commnet Normal post  but the container should be bigger
        // postList of first level responses
    )

}

export default ThreadView; 
