
import { useEffect, useState } from "react";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Loader1 from "../svg/Loader1/Loader1";

import VisitorPost from "../Posts/VisitorPost";

import useSigninModal from "../hooks/useModal";


const FeedPage = () => {
    // Use logged in user through jwt verification

    const { toggleModal } = useSigninModal();

    const [feedArray, setFeedArray] = useState();
    
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const [ postlistLoading, setPostlistLoading ] = useState();

    const [seeMoreLoading,  setSeeMoreLoading] = useState();


    const [userFeed, setUserFeed] = useState();


    const [lastFeedShown , setLastFeedShown] = useState(10)

    const createPosts = (commentsArray) => {
        
        let posts = []

        for(let i = 0; i < commentsArray.length; i++ ){

            let loggedInComments = commentsArray[i] 
            
            const {comment_id, text_content, created_at, status, likes, username, nickname, profile_pic_url} = loggedInComments;                
                
            if(loggedInComments.hasOwnProperty("comment_id")){

                posts.push( <VisitorPost key={comment_id} uuid={comment_id} userName={username} nickname={nickname} date_posted = {created_at} user_profile={profile_pic_url} text_content={text_content === null? 0: text_content} loggedInComments={commentsArray} createPosts={createPosts} posts={posts} status={ status} likes={likes} /> );

                
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

                    toggleModal()
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


            if(lastFeedShown < feedArray?.length ){
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
                    <div onClick={seeMorePosts}className={lastFeedShown >= feedArray?.length? "hidden" : "posts-see_more"}>See More &#8658;</div>
                </LoaderHOC>
        </>


    )

}


export default FeedPage
