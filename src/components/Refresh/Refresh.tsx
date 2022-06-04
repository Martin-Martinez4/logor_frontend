
import React, { FC, useEffect } from "react";
import TopBar from "../TopandBottom/TopBar";
import ContentArea from "../ContentArea/ContentArea";

import useAuth from "../hooks/useAuth";

const Homepage:FC = () => {

    // user should be set here in  use effect
    const { auth, setAuth } = useAuth();



    useEffect(() => {

        (() => {

            fetch('http://localhost:3001/token/refresh/', {

                method: "get",
                credentials:'include',
                cache:'no-cache',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((user) => {
                
    
                console.log(user)
    
                console.log(user.access_token)
                if(user.access_token){
    
                    // const from = location.state?.from?.pathname || `/user/1`;
    
                    console.log(user.access_token)
                    // token stuff
    
                    setAuth({ user_id: user.user_id, access_token:user.access_token });
    
                  
                        
                    
    
                       
                }
                else{

                    console.log("error")
    
                }
            })
        
    


        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <React.Fragment>
            <TopBar />
            {"test "  + auth.access_token }
            <ContentArea />
        </React.Fragment>
    );

}

export default Homepage

