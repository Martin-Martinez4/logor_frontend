
import React, { FC, useEffect, useState, useContext, useMemo } from "react";

import { serverAddressString } from "../utils/exportGetImage"; 

import Card from "../Card/Card";
import "./Posts.css";


import formatDate, { formatDateAgo } from "../utils/formatDate";

import useModal from "../hooks/useModal";
import SigininModal from "../SigninModal/SigninModal";
import CommnetBox from "../CommentBox/CommentBox";

import getTagsMentionsLinks from "../utils/getTagsMentionsLinks";
import addLinkTags from "../utils/addLinkTags";

import UserInfoContext from "../context/UserInfoProvider";

import HeartIcon from "../svg/HeartIcon/HeartIcon2";
import CheckmarkIcon from "../svg/CheckmarkIcon/CheckmarkIcon";
import ShareIcon2 from "../svg/ShareIcon2/ShareIcon2";
import ResponsesIcon from "../svg/ResponsesIcon/ResponsesIcon";

const VisitorPost: FC = ({ uuid, userName, nickname, user_profile, date_posted, text_content, status }) => {

    const { showModal, toggleModal } = useModal();


    const { loggedInUser } = useContext( UserInfoContext);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [postInformation, setPostInfomration] = useState({

        text_content: text_content,
        status: status
    });


    let lastEditedReadable: String;
    
    if(postInformation.status[1] === ""){
        lastEditedReadable = "";
    }
    else{
        // lastEditedReadable = new Date(status[1]).toString();
        lastEditedReadable = formatDate(postInformation.status[1]);
    }

    const dropdownContainer = React.createRef();
    const cancelButton = React.createRef();
    
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    const [replyMode, setReplyMode] = useState();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editMode, setEdiMode] = useState({

        visible: false,
        textContent: text_content
    });

    const toggleDropDownVisible = () => {

        setDropdownVisible(!dropdownVisible);

    }

    const toggleReplyMode = () => {

        setReplyMode(!replyMode)

    }
 
    useEffect(() => {

        const handleClickOutside = (e) => {
        
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


    let treatedText = useMemo(() => addLinkTags(getTagsMentionsLinks(postInformation.text_content)), [postInformation.text_content])


    return(

        <>

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
                        <img src={`${serverAddressString}${user_profile}`} alt="profile" className="post_user_image "></img>
                    
                    </div>
                    <div className="post user_content">
                        <div className="post user_info">
                            <div className="userNameArea">

                                <strong>{userName} </strong>

                                {/* Small Screen option dots */}
                                <span className="option_dots on_750px" onClick={toggleDropDownVisible} >
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>

                                        <p>Embed</p>
                                        <p>Other Option</p>
                                
                                    </span>
                                </span>
                            </div>
                                <em>{nickname}</em>
                                <span className="user_info__pipe on_Gthan750px"> | </span>
                                <em className="datePosted on_Gthan750px"> {formatDateAgo(new Date(new Date(date_posted).toUTCString()).getTime())}</em>
                                
                                <span className="user_info__pipe on_750px"><em className="datePosted"> ○ {formatDateAgo(date_posted)}</em></span>
                                

                    </div>
                    <div>
                            <p className="post_body_text">

                                {treatedText}
                            </p> 
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

                    

                        <div className="post__bottomArea">
                            {
                                (deleteConfirmationVisible|| editMode.visible)? 
                                <div> </div> :
                                <React.Fragment>
                                <div className="post__icons">
                                    <HeartIcon comment_id={uuid} loggedInUserId={loggedInUser.id}></HeartIcon>
                                    <CheckmarkIcon></CheckmarkIcon>
                                    <ResponsesIcon comment_id={uuid} ></ResponsesIcon>
                                    {/* <ShareIcon2></ShareIcon2> */}
                                    {/* <ShareIcon2></ShareIcon2> */}
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
                            <p onClick={() => toggleReplyMode()}>Reply</p>
                        
                        </span>
                    </span> 
                </>
     }
        </Card>
    }
        </>
    );
}


export default VisitorPost;


