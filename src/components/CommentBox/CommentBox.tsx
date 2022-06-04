
import React, { FC, useState, useContext } from "react";

import { v4 as uuidv4 } from 'uuid';

import "./CommentBox.css";
import Card from "../Card/Card";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import useSigninModal from "../hooks/useModal";

import { tagsMentionsCreate } from "../utils/tagMentions";
import UserInfoContext from "../context/UserInfoProvider";



const PostBox:FC = ({ createPosts, setPostsArray, postListFetchFunction, parent_id, toggleFunction}) => {

    const { loggedInUser } = useContext( UserInfoContext);

    const [buttonLoading ,setButtonLoading] = useState()


    const {id}: {id:string; profile_pic_url:string } = loggedInUser;

    const maxChars = 920;

    const { toggleModal } = useSigninModal();
    
    const [ newPost, setNewPost ] = useState({

        commentBox:""

    });

    const [charsLeft, setCharsLeft] = useState(maxChars)

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault()
        
        if(e === null){
            return
        }


        setCharsLeft(maxChars - e.target.value.length)

        setNewPost(prev => ({ ...prev, [e.target.name]: e.target.value }))


    }

    const handleKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.key === "Tab") {
            e.preventDefault();

            let tabAdded = e.target.value + "\t"; 

            setNewPost(prev => ({ ...prev, [e.target.name]: tabAdded }))
        
          }

        if (e.key === "Enter") {
            e.preventDefault();

            let tabAdded = e.target.value + "\n"; 

            setNewPost(prev => ({ ...prev, [e.target.name]: tabAdded }))
        
          }
    }

    const clearInput = (targetName, setFunction) => {

        setFunction({[targetName]:""})
    }

    const addPostToList = async () => {

        setButtonLoading(true)

        const comment_id = uuidv4();

        await fetch(`http://localhost:3001/home/create/comments`, {

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

            clearInput("commentBox", setNewPost);
            
            setCharsLeft(maxChars);

            setButtonLoading(false);

            if(postListFetchFunction){

                return postListFetchFunction()
                .then((com) => {
                    setPostsArray(createPosts(com))
                })
                .catch((err) => {
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
            toggleModal()
            console.error(error);

        });

        setButtonLoading(false)

        
    }


    const handleCancelCommentBox = () => {

        setButtonLoading(true)

        clearInput("commentBox", setNewPost);
        setCharsLeft(maxChars);

        if(toggleFunction){

            toggleFunction()
        }

        setButtonLoading(false)


    }


    return(

        <Card classes="content content__commentBox">


            <textarea id="commentBox" name="commentBox" value={newPost.commentBox} onChange={oninputChange} onKeyDown={handleKeyDown} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={maxChars} cols={92} rows={10}></textarea>

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



