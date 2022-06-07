
import { useEffect, useState } from "react";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Loader1 from "../svg/Loader1/Loader1";

import VisitorPost from "../Posts/VisitorPost";

import useSigninModal from "../hooks/useModal";


const FeedPage = () => {
    // Use logged in user through jwt verification

    const { toggleModal } = useSigninModal();

    const [feedArray, setFeedArray] = useState<JSX.Element[]>();
    
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const [ postlistLoading, setPostlistLoading ] = useState<boolean>();

    const [seeMoreLoading,  setSeeMoreLoading] = useState<boolean>();


    const [userFeed, setUserFeed] = useState<JSX.Element[]>();


    const [lastFeedShown , setLastFeedShown] = useState<number>(10)

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

    const createPosts = (commentsArray: PostsArray) => {
        
        let posts = []

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i] 
            
            const {comment_id, text_content, created_at, status, likes, username, nickname, profile_pic_url} = loggedInComments;                
                
            if(loggedInComments.hasOwnProperty("comment_id")){

                posts.push( <VisitorPost key={comment_id} comment_id={comment_id} username={username} nickname={nickname} created_at = {created_at} profile_pic_url={profile_pic_url} text_content={text_content === null? "": text_content} status={ status} likes={likes} /> );

                
            }
            
        }


        return posts
    }

    useEffect(() => {

        const setInitFeed = async () => {
            setPostlistLoading(true)


            await fetch(`http://localhost:3001/home/posts/feed/`, {
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

                setFeedArray(createPosts(comments))


                let start = 0;
                let howMany = 10;

                let extractedArr = feedArray?.filter((item, index)=>{
                    return index >= start && index < howMany + start ;
                })
                
                setUserFeed(extractedArr)
                setLastFeedShown(10)

                // setPostlistLoading(false)
            })
            .catch(error => {
                
                if(error === 403){

                    toggleModal!()
                }

            })
            setPostlistLoading(false)
        }
        
        setInitFeed()

    // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [])

    const seeMorePosts = async () => {

        setSeeMoreLoading(true)

        await fetch(`http://localhost:3001/home/posts/feed/`, {
            method: "get",
            credentials:'include',
                cache:'no-cache',
                headers: {
                    
                    'Content-Type': 'application/json',
                  },
        }).then(response => response.json())
        .then(comments => {

            setFeedArray(createPosts(comments))


            if(feedArray && lastFeedShown < feedArray?.length ){
                const increment = 10;
        
                const lastNewPostIndex = lastFeedShown? lastFeedShown + increment: increment
        

                setLastFeedShown(lastNewPostIndex)
        
                setUserFeed(feedArray?.slice(0,lastNewPostIndex))

            
        }
            else{
                
                
                
            }
            setSeeMoreLoading(false)
        })

        



    }


    useEffect(() => {

        setPostlistLoading(true)

        setUserFeed(feedArray?.slice(0,lastFeedShown))
        setPostlistLoading(false)

    // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [feedArray])

    return(

        <>
        
                {
                    userFeed === undefined
                    ? <Loader1></Loader1>
                    : userFeed
                
                }

                <LoaderHOC loading={seeMoreLoading}>
                    <div onClick={seeMorePosts}className={feedArray && lastFeedShown >= feedArray?.length? "hidden" : "posts-see_more"}>See More &#8658;</div>
                </LoaderHOC>
        </>


    )

}


export default FeedPage
