
import {  Outlet } from "react-router-dom"
import {  useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import UserInfoContext from "../context/UserInfoProvider";
import Loader1 from "../svg/Loader1/Loader1";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const { loadUser  } = useContext( UserInfoContext);


    useEffect(() => {

        let isMounted = true;

        const verifyRefreshToken = async () => {


            try {
                
                await refresh();

                await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/loggedin/user/info/`, {

                    method: "get",
                    credentials:'include',
                    cache:'no-cache',
                    headers: {
                        
                        'Content-Type': 'application/json',
                      },
                })
                .then(res => res.json())
                .then(user => {
                    // console.log("user:",user[0])

                    try{

                        loadUser!(user[0]) 
                        
                        
                    }
                    catch(err){

                        console.error(err)
                    }
                
                })
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);

        return () => {

            isMounted = false
            setIsLoading(false)
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${auth?.access_token}`)
        // console.log(`user-id: ${auth?.user_id}`)
    }, [isLoading])

    return (
        <>
            {isLoading
            ? <Loader1></Loader1>
            : auth?.access_token
            ? <Outlet/>
            : <Outlet/>
            }
        </>
    )
}

export default PersistLogin

