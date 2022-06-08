
import React, { FC, useState, useContext, Dispatch, SetStateAction } from "react";

import { v4 as uuidv4 } from 'uuid';

import "./CommentBox.css";
import Card from "../Card/Card";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import useSigninModal from "../hooks/useModal";

import { tagsMentionsCreate } from "../utils/tagMentions";
import UserInfoContext from "../context/UserInfoProvider";

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

type CreatePostsProp = ((commentsArray: PostsArray, allComments?: any) => JSX.Element[]) | ((commentsArray: PostsArray,  allComments?: any) => Element[])

type CommentBoxProps = { 
    createPosts?: CreatePostsProp; 
    setPostsArray?:any | Dispatch<SetStateAction<JSX.Element[] | undefined>>; 
    postListFetchFunction?: () => Promise<any>; 
    parent_id: string; 
    toggleFunction?: () => void;
}


const PostBox:FC<CommentBoxProps> = ({ createPosts, setPostsArray, postListFetchFunction, parent_id, toggleFunction}) => {

    const { loggedInUser } = useContext( UserInfoContext);

    const [buttonLoading ,setButtonLoading] = useState<boolean>()


    const id = loggedInUser?.id;


    const maxChars = 920;

    const { toggleModal } = useSigninModal();
    
    const [ newPost, setNewPost ] = useState({

        commentBox:""

    });

    const [charsLeft, setCharsLeft] = useState(maxChars)

    const oninputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        e.preventDefault()
        
        if(e === null){
            return
        }


        setCharsLeft(maxChars - e.target.value.length)

        setNewPost(prev => ({ ...prev, [e.target.name]: e.target.value }))


    }

    const handleKeyDown =  (e: React.KeyboardEvent<HTMLTextAreaElement>)  => {

        const target = (e.target as HTMLInputElement);

        if (e.key === "Tab") {
            e.preventDefault();

            let tabAdded = target.value + "\t"; 

            setNewPost(prev => ({ ...prev, [target.name]: tabAdded }))
        
          }

        if (e.key === "Enter") {
            e.preventDefault();

            let tabAdded = target.value + "\n"; 

            setNewPost(prev => ({ ...prev, [target.name]: tabAdded }))
        
          }
    }

    const clearInput = (targetName: string, setFunction: (x: { [x: string]: string; }) => {}) => {

        setFunction({[targetName]:""})
    }

    const addPostToList = async () => {

        setButtonLoading(true)

        const comment_id = uuidv4();

        await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/create/comments`, {

            method: "post",
            credentials:'include',
            cache:'no-cache',
            headers: {
                
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                user_id: id,
                text_content: newPost.commentBox,
                newComment_id: comment_id,
                parent_id: parent_id,

            })
        })
        .then((comment) => {

            return comment.json()
            
        })
        .then(() => {
            

            // setPostsArray(createPosts(com))
            
            tagsMentionsCreate(comment_id, newPost["commentBox"])

            clearInput("commentBox", setNewPost as (x: { [x: string]: string; }) => {});
            
            setCharsLeft(maxChars);

            setButtonLoading(false);

            if(postListFetchFunction){

                return postListFetchFunction()
                .then((com: PostsArray) => {

                        setPostsArray(createPosts!(com))
                })
                .catch((err: any) => {
                    console.error(err);
    
                })
            }

            if(toggleFunction){

                toggleFunction()
            }

        })
        .catch((error) => {

            setButtonLoading(false)

            console.log("error")
            toggleModal!()
            console.error(error);

        });

        setButtonLoading(false)

        
    }


    const handleCancelCommentBox = () => {

        setButtonLoading(true)

        clearInput("commentBox", setNewPost as (x: { [x: string]: string; }) => {});
        setCharsLeft(maxChars);

        if(toggleFunction){

            toggleFunction()
        }

        setButtonLoading(false)


    }


    return(

        <Card classes="content content__commentBox">


            <textarea id="commentBox" name="commentBox" value={newPost.commentBox} onChange={oninputChange} onKeyDown={() => handleKeyDown} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={maxChars} cols={92} rows={10}></textarea>

            <div className="commentBox__buttonArea">
                
                <em className="buttonArea__charsLeft">Characters Left: {charsLeft}</em>
                <div className="buttonArea__buttons">
                    <LoaderHOC  loading={buttonLoading}>

                        <button className="button primary" onClick={() => addPostToList()}>Submit</button>
                        <button className="button red" onClick={() => handleCancelCommentBox()}>Cancel</button>
                    </LoaderHOC>

                </div>
            </div>
        </Card>
)

}

export default PostBox;



