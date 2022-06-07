
import React, { FC, useEffect, useState, useMemo } from "react";

import { getImageString } from "../utils/exportGetImage";
import Card from "../Card/Card";
import "./Posts.css";
import formatDate, { formatDateAgo } from "../utils/formatDate";

import getTagsMentionsLinks from "../utils/getTagsMentionsLinks";
import addLinkTags from "../utils/addLinkTags";


import { tagsMentionsEdit } from "../utils/tagMentions";
import useAuth from "../hooks/useAuth";
import SigininModal from "../SigninModal/SigninModal";
import { refreshTokenBool } from "../utils/tokenRefreshedBool";

import CommnetBox from "../CommentBox/CommentBox";

import HeartIcon from "../svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../svg/CheckmarkIcon/CheckmarkIcon";
import ResponsesIcon from "../svg/ResponsesIcon/ResponsesIcon";
import useSigninModal from "../hooks/useModal";
// import UserInfoContext from "../context/UserInfoProvider";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

type PostComponent = { 
    uuid: string; 
    username: string; 
    nickname: string; 
    profile_pic_url: string; 
    date_posted: string; 
    text_content: string; 
    status: string;
    likes: string | number;
}

const Post: FC<PostComponent> = ({ uuid, username, nickname, profile_pic_url, date_posted, text_content, status }) => {

    const maxChars = 920;

    const { auth, setAuth } = useAuth();
    // const { showModal, toggleModal } = useModal();
    const { showModal, toggleModal } = useSigninModal();

    const [replyMode, setReplyMode] = useState<boolean>();
    
    // const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);
    // const { loggedInUser } = useContext( UserInfoContext);


    const [postInformation, setPostInfomration] = useState({

        text_content: text_content,
        status: status
    });


    const [charsLeft, setCharsLeft] = useState(maxChars - (postInformation.text_content?.length? postInformation.text_content.length:0));

    useEffect(() => {

        return () => {
            // this now gets called when the component unmounts
          };

    }, [profile_pic_url, postInformation])




    let lastEditedReadable: String;
    
    if(postInformation.status[1] === ""){
        lastEditedReadable = "";
    }
    else{
        lastEditedReadable = formatDate(postInformation.status[1]);
    }

    const dropdownContainer = React.createRef<HTMLInputElement>();
    const cancelButton = React.createRef<HTMLButtonElement>();
    
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [dropDownLoading, setDropDownLoading] = useState<boolean>()
    const [cancelButtonPress, setCancelButtonPress] = useState<boolean>()

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    const [editMode, setEdiMode] = useState({

        visible: false,
        textContent: text_content
    });

    const toggleDropDownVisible = () => {

        setDropdownVisible(!dropdownVisible);

    }

    const toggleDeleteConfirmationVisible = async () => {

        setDropDownLoading(true)

        try{

            if(await refreshTokenBool(setAuth!)){
    
                setDeleteConfirmationVisible(!deleteConfirmationVisible);
        
                if(editMode.visible){
        
                    let tempVisible:boolean = false;
            
                    setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))

                }
            }
            else{
    
                toggleModal!()
                
                
            }

            setDropDownLoading(false)

        }
        catch{
            
            toggleModal!()
            setDropDownLoading(false)

        }

        setDropDownLoading(false)



    }



    const toggleEditMode = async () => {

        setDropDownLoading(true)

        try{
            
            if(await refreshTokenBool(setAuth!)){
                
                
                let tempVisible:boolean = !(editMode.visible);
                
                setEdiMode(prevEditMode => ({ ...prevEditMode, "visible":tempVisible }))
        
                if(deleteConfirmationVisible){
        
                    setDeleteConfirmationVisible(false);
                }
            }else{
        
        
                toggleModal!()
            }

            setDropDownLoading(false)

}
        catch{

            setDropDownLoading(false)
            toggleModal!()
                    
        }
    }

    useEffect(() => {

        const handleClickOutside = (e: any) => {
        
            if (
                dropdownContainer.current &&
                !dropdownContainer?.current?.contains(e.target)
                ) {
                    setDropdownVisible(false);
                }
                
            if (
                cancelButton.current &&
                !cancelButton?.current?.contains(e.target)
                ){
                    setDeleteConfirmationVisible(false);
                }
                    
                
        };

        document.addEventListener("mouseup", handleClickOutside);


        return () => {

            document.removeEventListener("mouseup", handleClickOutside);
        }
      

    }, [dropdownVisible, deleteConfirmationVisible, editMode, status,  cancelButton, dropdownContainer]);

    const handleDelete =async (e: { preventDefault: () => void; }) => {
        
        e.preventDefault();
        setDropDownLoading(true)

        await fetch(`http://localhost:3001/home/delete/${uuid}`, {
    
            method: "post",
            credentials:'include',
            cache:'no-cache',
            headers: {
                
                'Content-Type': 'application/json',
              },

        })
        .then(res => res.json()
        )
        .then( (comment) => {

          
            setPostInfomration(prev => ({...prev, status: comment["status"], text_content: comment["text_content"]}))

        })
        .catch(console.log)

        setDropDownLoading(false)




    }


    const oninputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        if(e === null){
            return
        }

        setEdiMode(prev => ({ ...prev, [e.target.name]: e.target.value }))

        setCharsLeft(maxChars - (e.target.value?.length? e.target.value.length: 0) )

        e.preventDefault()
    }

    
    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        // e.preventDefault();

        toggleEditMode()


        await fetch(`http://localhost:3001/home/update/${uuid}`, {
    
            method: "post",
            credentials:'include',
            cache:'no-cache',
            headers: {
                
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                text_content: editMode.textContent
            })

        })
        .then(res => res.json()
        )
        .then( (comment) => {

            setPostInfomration(prev => ({...prev, status: comment["status"], text_content: comment["text_content"]}))
        })
        .catch(console.log)


        await tagsMentionsEdit(uuid, editMode["textContent"])


    }

    const exitEditMode = (e: { preventDefault: () => void; }) => {

        setCancelButtonPress(true)

        e.preventDefault()

        toggleEditMode();

        setEdiMode(prev => ({ ...prev, "textContent": `${postInformation.text_content}` }))

        setCharsLeft(maxChars- postInformation.text_content.length);

        setCancelButtonPress(false)




    }

    const toggleReplyMode = () => {

        setReplyMode(!replyMode)

    }

    let treatedText = useMemo(() => addLinkTags(getTagsMentionsLinks(postInformation.text_content)), [postInformation.text_content])

 

        return(

            <>

            <LoaderHOC loading={dropDownLoading}>
                <SigininModal
                    showModal={showModal}
                    hide={toggleModal}
                />

            {postInformation.status[0] === "Deleted"?
            <Card classes="content post deleted">
                    
            <p className="post_body_text">This Post was Deleted by the user</p>
            
       
            </Card>
            :

        
            <Card classes="content post">



                {
                status[0] === "Deleted"
                ?
                <>
                <p className="post_body_text">This Post was Deleted by the user</p>
                </> 
                :
                <>
                <div className="post user_image">
                    <img src={`${getImageString}${profile_pic_url}`} alt="profile" className="post_user_image "></img>
                   
                </div>
                <div className="post user_content">
                    <div className="post user_info">
                        <div className="usernameArea">

                            <strong>{username} </strong>

                            {/* Small Screen option dots */}
                            <span className="option_dots on_750px" onClick={toggleDropDownVisible} >
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>

                                <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>

                                    <p>Embed</p>
                                    <p onClick={toggleEditMode}>Edit</p>
                                    <p onClick={toggleDeleteConfirmationVisible}>Delete</p>
                                </span>
                            </span>
                        </div>
                            <em>{nickname}</em>
                            <span className="user_info__pipe on_Gthan750px"> | </span>
                            <em className="datePosted on_Gthan750px"> {formatDateAgo(new Date(new Date(date_posted).toUTCString()).getTime())}</em>
                            
                            <span className="user_info__pipe on_750px"><em className="datePosted"> ○ {formatDateAgo(date_posted)}</em></span>
                            

                </div>
                   <div>

                        {editMode.visible? 
                            (
                                
                                <div>
                                    <textarea id="commentBox" name="textContent" value={editMode.textContent} onChange={(e) => oninputChange(e)} className="commentBox__commentInput" placeholder="Have something to say?" maxLength={maxChars} cols={92} rows={10}></textarea>

                                    <div className="commentBox__buttonArea">
                                    <LoaderHOC loading={cancelButtonPress}>
                                        
                                        <em className="buttonArea__charsLeft">Characters Left: {charsLeft}</em>
                                    </LoaderHOC>
                                        <div className="buttonArea__buttons">
                                            <button className="button primary" onClick={(e) => handleEdit(e)}>Submit</button>
                                            <button className="button red" onClick={exitEditMode} >Cancel</button>

                                        </div>
                                    </div>
                                </div>
                            ) 
                            :
                            <p className="post_body_text">

                                {treatedText}
                            </p>
                            }

{
                                replyMode
                                ?
                                <p className="post_body_text">

                                    <CommnetBox parent_id={uuid} toggleFunction={() => toggleReplyMode()}></CommnetBox>
                                </p> 
                                :
                                ""
                            }
                    </div>

                    <span className={`${deleteConfirmationVisible?"visible":"invisible"}`} >
                        <p>Are you sure you want to delete this post</p>
                        <div>
                            <button className="button red" onClick={toggleDeleteConfirmationVisible} ref={cancelButton}>No</button>
                            <button className="button primary" onClick={handleDelete} >Yes</button>

                        </div>
                    </span>

                    <div className="post__bottomArea">
                        {
                            (deleteConfirmationVisible|| editMode.visible)? 
                            <div> </div> :
                            <React.Fragment>
                               <div className="post__icons">
                                <HeartIcon comment_id={uuid} ></HeartIcon>
                                <CheckmarkIcon ></CheckmarkIcon>
                                <ResponsesIcon comment_id={uuid}></ResponsesIcon>
                            </div>
                            <div className="post__lastEdited">
                            {postInformation.status[0] === "Edited"? (<React.Fragment><p>Lasted Edited on: </p><p> {lastEditedReadable}</p></React.Fragment>):<p></p>}
                            </div>

                            </React.Fragment>
                        }

                    </div>
                </div>
                <span className="option_dots on_Gthan750px" onClick={toggleDropDownVisible}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>
                    
                        <p onClick={toggleEditMode}>Edit</p>
                        <p onClick={toggleDeleteConfirmationVisible}>Delete</p>
                        <p onClick={() => toggleReplyMode()}>Reply</p>

                    </span>
                </span> 
                </>
         }
            </Card>
        }
        </LoaderHOC>
            </>
        );
}

export default Post


