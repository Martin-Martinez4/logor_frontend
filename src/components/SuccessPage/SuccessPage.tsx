

import React, { useEffect, FC } from "react";
import {useNavigate } from 'react-router-dom';
import Card from "../Card/Card";
import "./SuccessPage.css"
import checkMark from "../../assets/Round_Check.svg";


const SuccessPage: FC = () => {

    const registerSuccess:Boolean = true;

    const navigate = useNavigate();

    const navigateHome = ():void => {
        navigate('/users/');
        }

    const navigateLandingpage = ():void => {
        navigate('/');
        }


    useEffect( () => {

        if(registerSuccess === true ){

            setTimeout(():void => { 
                navigateHome()
            }, 2000)
        }else{
            setTimeout(():void => { 
                navigateLandingpage()
            }, 2000)
        }
        // Anything in here is fired on component mount.
     }, );


    return (
        
    <form className="register flexColContainer">


        <Card classes={"register_card"}>
           
        { registerSuccess === true 
        ? 
        <div className="flexColContainer">
            <h1>Success</h1>
           <img className="success_image" src={checkMark} alt="Round checkmark" />
        </div>

        
         :
         <div className="flexColContainer">
             <h2>I am error</h2>
             <h4><a href="/">Go back</a></h4>
         </div>

    }

        </Card>
    </form>

    )
    
}

export default SuccessPage;






