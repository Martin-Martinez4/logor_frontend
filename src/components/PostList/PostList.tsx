
import { FC, useContext, useState, useEffect, lazy, Suspense } from "react";

import Scroll from "../Scroll/Scroll";

import Card from "../Card/Card";
import Post from "../Posts/Post";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import CommentBox from "../CommentBox/CommentBox";

import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";

import { createMiniProfiles } from "../utils/createMiniprofilesArray";
import { getHomePosts } from "../utils/fetchPostsPromise";

import SigninModalHOC from "../SigninModal/SigninModalHOC";
import UserInfoContext from "../context/UserInfoProvider";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Loader1 from "../svg/Loader1/Loader1";
import useSigninModal from "../hooks/useModal";


import "./postlist.css"

const FollowersPage = lazy(() => import("../FollowersPage/FollowersPage"));
const MentionsPage = lazy(() => import("../MentionsPage/MentionsPage"));
const FeedPage = lazy(() => import("../FeedPage/FeedPage"));

type PostType = { 
    comment_id: string; 
    username: string; 
    nickname: string; 
    profile_pic_url: string; 
    created_at: string; 
    text_content: string | null; 
    status: string;
    likes: string | number;
}

type PostsArray = PostType[]

// type createPostsType = 

const PostList: FC = () => {

    const { toggleModal } = useSigninModal();


    const [ postlistLoading, setPostlistLoading ] = useState<boolean>();

    const [tabState, setTabState ] = useState("posts")

    const [seeMoreLoading, setSeeMoreLoading] = useState<boolean>();


    // eslint-disable-next-line
    // const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);
    const { loggedInUser } = useContext( UserInfoContext);

    const [userPosts, setUserPosts] = useState<JSX.Element[]>();

    const [postsArray, setPostsArray] = useState<JSX.Element[]>();

    const [lastPostShown , setLastPostShown] = useState(10)

    // Get user comments
    const createPosts = (commentsArray: PostsArray) => {
        
        let posts = []

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i]; 
            
            const {comment_id, text_content, created_at, status, likes, username, nickname, profile_pic_url} = loggedInComments;                
                
            if(loggedInComments.hasOwnProperty("comment_id")){

                posts.push( <Post key={`post_${comment_id}`} uuid={comment_id} username={username} nickname={nickname} date_posted={created_at} profile_pic_url={profile_pic_url} text_content={text_content === null ? "" : text_content} status={status} likes={likes} /> );

                
            }
            
        }


        return posts
    }
    
    useEffect(() => {

        const setInitPosts = async() => {

            setPostlistLoading(true)
    
            await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/`, {
                    method: "get",
                    credentials:'include',
                        cache:'no-cache',
                        headers: {
                            
                            'Content-Type': 'application/json',
                          },
                }).then(response => {
                    if(!response.ok) throw response.status;
                    else return response.json();
                })
                .then(comments => {
                    
    
                    setPostsArray(createPosts(comments))

    
                    let start = 0;
                    let howMany = 10;
    
                    let extractedArr = postsArray?.filter((item, index)=>{
                        return index >= start && index < howMany + start ;
                    })

    
                    setUserPosts(extractedArr)
                    setLastPostShown(10)
    
                    setPostlistLoading(false)
                })
                .catch(error => {
                
                    if(error === 403){
    
                        toggleModal!()
                    }
    
                })
        }

        setInitPosts()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser?.id])

    
    const [ suggestedProfiles, setSuggestedProfiles ] = useState();

    let miniprofilesArray = [];

    // get three random user_ids
    useEffect(() => {

        (async (setSuggestedProfiles) => {

            const featuredUsers = await getRandomUserIDs(4);

            setSuggestedProfiles(featuredUsers)

            
        })(setSuggestedProfiles)
        
        
    }, [])
    


    miniprofilesArray = createMiniProfiles(suggestedProfiles? suggestedProfiles : []);

    const seeMorePosts = async () => {

        setSeeMoreLoading(true)

        await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/`, {
            method: "get",
            credentials:'include',
                cache:'no-cache',
                headers: {
                    
                    'Content-Type': 'application/json',
                  },
        }).then(response => {
            if(!response.ok) throw response.status;
            else return response.json();
        })
        .then(comments => {

            setPostsArray(createPosts(comments))


            if(postsArray){

                if(lastPostShown < postsArray?.length ){
                    const increment = 10;
            
                    const lastNewPostIndex = lastPostShown? lastPostShown + increment: increment
            
    
                    setLastPostShown(lastNewPostIndex)
            
                    setUserPosts(postsArray?.slice(0,lastNewPostIndex))
                
            }
        }
            else{
                
                
                
            }
            setPostlistLoading(false)
        })
        .catch(error => {
                
            if(error === 403){

                toggleModal!()
            }

        })

        setSeeMoreLoading(false)


        



    }

    useEffect(() => {

        setUserPosts(postsArray?.slice(0,lastPostShown))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postsArray])

 

    const onChangeTab = (e: any) => {
        e.preventDefault();

        setPostlistLoading(true)

        const tabName = e.target.getAttribute('data-tabname');

        setTabState(tabName);

        setPostlistLoading(false)




    }


    
        return(
            // style={{ display:"flex", flexDirection: "column" }}
            <div className="postlist_horizontal" >
            <Scroll>
                <ProfileHeader/>
                
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
                
                <SigninModalHOC>

                    <CommentBox createPosts={createPosts} setPostsArray={setPostsArray} postListFetchFunction={() => getHomePosts()} parent_id={""} ></CommentBox>

                </SigninModalHOC>
         
                    
                    <div className="postlist-tabs">
                        <li className={tabState === "posts"? "tab_active": ""} data-tabname="posts" onClick={onChangeTab} >Posts</li>
                        <li className={tabState === "mentions"? "tab_active": ""} data-tabname="mentions" onClick={onChangeTab} >Mentions</li>
                        <li className={tabState === "feed"? "tab_active": ""} data-tabname="feed" onClick={onChangeTab} >Feed</li>
                        <li className={tabState === "followers"? "tab_active": ""} data-tabname="followers" onClick={onChangeTab} >Followers</li>
                      
                    </div>

                <LoaderHOC loading={postlistLoading}>
                    <Suspense fallback={<Loader1 />}>

                        {/* {whatToRender(tabState)} */}
                        {tabState === "posts"? 
                            <>
                                {userPosts}
                                <LoaderHOC loading={seeMoreLoading}>

                                    <div onClick={seeMorePosts}className={lastPostShown >= postsArray?.length! ? "hidden" : "posts-see_more"}>See More &#8658;</div>
                                </LoaderHOC>

                            </>
                            :tabState === "mentions"
                            ? <MentionsPage></MentionsPage>
                            :tabState === "followers"
                            ? <FollowersPage user_id={loggedInUser?.id as string} ></FollowersPage>
                            :tabState === "feed"
                            ? <FeedPage></FeedPage>
                            :""
                        }
                      
                    </ Suspense>
                    
                </LoaderHOC>
                
                <div className="empty"></div>
            </Scroll>
              
            </div>
        );
}

export default PostList

