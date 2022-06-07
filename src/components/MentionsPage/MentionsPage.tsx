
import { FC, useEffect, useState, useContext } from 'react';

import UserInfoContext from '../context/UserInfoProvider';

import LoaderHOC from '../LoaderHOC/LoaderHOC';

import Loader1 from '../svg/Loader1/Loader1';

import VisitorPost from '../Posts/VisitorPost';
import useSigninModal from "../hooks/useModal";

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


const MentionsPage:FC = () => {

    const { toggleModal } = useSigninModal();

    const [mentionsArray, setMentionsArray] = useState<JSX.Element[]>();

    const { loggedInUser } = useContext( UserInfoContext);
    
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const [ postlistLoading, setPostlistLoading ] = useState<boolean>();
    const [seeMoreLoading,  setSeeMoreLoading] = useState<boolean>();



    const [userMentions, setUserMentions] = useState<JSX.Element[]>();


    const [lastMentionShown , setLastMentionShown] = useState(10)

    const createPosts = (commentsArray: PostsArray)  => {
        
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

        const getMentionPost = async () => {

            await fetch(`http://localhost:3001/home/posts/mentions/`, {
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

                setMentionsArray(createPosts(comments))


                let start = 0;
                let howMany = 10;

                let extractedArr = mentionsArray?.filter((item, index)=>{
                    return index >= start && index < howMany + start ;
                })
                
                setUserMentions(extractedArr)
                setLastMentionShown(10)

                setPostlistLoading(false)
            })
            .catch(error => {
                
                if(error === 403){

                    toggleModal!()
                }

            })
        }

        getMentionPost()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser?.id])

    
    const seeMorePosts = async () => {

        setSeeMoreLoading(true)

        await fetch(`http://localhost:3001/home/posts/mentions/`, {
            method: "get",
            credentials:'include',
                cache:'no-cache',
                headers: {
                    
                    'Content-Type': 'application/json',
                  },
        }).then(response => response.json())
        .then(comments => {

            setMentionsArray(createPosts(comments))


            if(mentionsArray && lastMentionShown < mentionsArray?.length ){
                const increment = 10;
        
                const lastNewPostIndex = lastMentionShown? lastMentionShown + increment: increment
        

                setLastMentionShown(lastNewPostIndex)
        
                setUserMentions(mentionsArray?.slice(0,lastNewPostIndex))

            
        }
            else{
                
                
                
            }
            setSeeMoreLoading(false)
        })

        



    }

    useEffect(() => {

        setUserMentions(mentionsArray?.slice(0,lastMentionShown))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mentionsArray])


    return(
        <>
             {
                userMentions === undefined
                ? <Loader1></Loader1>
                : userMentions
                
            }

            <LoaderHOC loading={seeMoreLoading}>

                <div onClick={seeMorePosts}className={mentionsArray && lastMentionShown >= mentionsArray?.length? "hidden" : "posts-see_more"}>See More &#8658;</div>
            </LoaderHOC>

        </>
    )
    

}

export default MentionsPage;


