
import React, { FC, useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import LoaderHOC from "../LoaderHOC/LoaderHOC";

import useSigninModal from "../hooks/useModal";

import useAuth from "../hooks/useAuth";
import UserInfoContext from "../context/UserInfoProvider";

import "./Signin.css"

type reDirect = {

    reDirect: boolean;
}

const Signin:FC<reDirect> = ({ reDirect }) => {

    const { showModal, toggleModal } = useSigninModal();

    const { loadUser } = useContext( UserInfoContext);

    const [signinLoading, setSigninLoading] = useState<boolean>()

    const { setAuth } = useAuth();

    const navigate = useNavigate();


    

    
    const [loginError, setLoginError] = useState({

        inputError:false,
        flagTripped: false
    });
    // const [hasLoaded, sethasLoaded] = useState(false);
  
    const [userCreds, setUserCreds] = useState({

        username:"",
        password:""
    });

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        setUserCreds(userCreds => ({...userCreds, [e.target.name]: (e.target.value).toString()}))

        e.preventDefault();

        
    }

    const errorMessageTimeout = (milisecs: number) => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {inputError, flagTripped} = loginError

        setLoginError(prev =>({...prev, flagTripped:true}));
        setLoginError(prev =>({...prev, inputError:true}));

        setTimeout(() =>  setLoginError(prev =>({...prev, inputError:false})), milisecs);

    }

    const onAttemptLogin = async (e: { preventDefault: () => void; }) => {

        
        e.preventDefault();

        setSigninLoading(true)
        
        const {username, password} = userCreds

        await fetch('http://localhost:3001/signin2', {

            method: "post",
            credentials:'include',
            cache:'no-cache',
            headers: {
                
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => response.json())
        .then((user) => {
            
            if(user.access_token){


                // token stuff

                setAuth!(() => {

                    return { user_id: user.user_id, access_token:user.access_token }
                });



                

                // login().then(() => {
                        
                    // loadUser(user);
                      return fetch(`http://localhost:3001/loggedin/user/info/`, {

                        method: "get",
                        credentials:'include',
                        cache:'no-cache',
                        headers: {
                            
                            'Content-Type': 'application/json',
                          },
                    })
                    .then(res => res.json())
                    .then(user => {

                        console.log(user[0])

                        try{

                            if(loadUser){

                                loadUser(user[0]) 
                            }

                            

                            if(showModal){

                                toggleModal!();
                            }

                            if(reDirect){

                                navigate(`/home/${user[0].id}`)
                            }

                            setSigninLoading(false)

                            
                            
                        }
                        catch(err){

                            console.error(err)
                            setSigninLoading(false)

                        }
                    
                    })

                 
                   
            }
            else{

                setSigninLoading(false)


                errorMessageTimeout(3000);
            }

        }).catch((err)=> {
            
            setSigninLoading(false)

            console.log(err)
        })

        setSigninLoading(false)


        

    }
            



    return (
        
    <form className="signin flexColContainer">


        <h2 className="signin__title"> Welcome!</h2>
        <h3 className="signin__title">Login!</h3>

        <div className=" flexColContainer inner">
        <LoaderHOC loading={signinLoading}>
            <div className="flexColContainer">

                <span className={`${loginError.inputError?"errorBackground":loginError.flagTripped?"fadeOut":"hdden"}`} >incorrect username and/or password</span>


                <label htmlFor="uname" className="upperleft ">
                
                    <h4 className="inputName">Username</h4> 
                    <input className="" type="text" placeholder="Enter Username" name="username" onChange={oninputChange} required />
                </label>
                
                <label htmlFor="password" className="upperleft">
                    <h4 className="inputName">Password</h4>
                
                    <input type="password" placeholder="Enter Password" name="password" onChange={oninputChange} required />
                </label>

                <div>
                    <button type="submit" className=" button primary" onClick={onAttemptLogin} >Login</button>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="remember" />Remember Me?
                    </label>
                </div>
            </div>

            <div className="flexColContainer inner" >
                <span >Forgot your password?  <Link to="/reset"> Reset your password.</Link></span>
                <span >Do not have an account? <Link to="/register">Register Here.</Link></span>
            </div>
        </LoaderHOC>
        </div>

    </form>

    )
    
}

export default Signin;




