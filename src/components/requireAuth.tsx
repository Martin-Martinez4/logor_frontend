import { useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import UserInfoContext from "./context/UserInfoProvider";


const RequireAuth = () => {
    
    const { auth } = useAuth();
    const location = useLocation();
    const { loadUser } = useContext( UserInfoContext);
  
    
    useEffect(() => {

        const fetchLoadUSer  = async (user_id, loadUser) => {

            try{

                if(user_id){

                }

                await fetch(`http://localhost:3001/usersInfo/${user_id}`, {
                
                    method: "get",
                    headers: {
                        
                        'Content-Type': 'application/json',
                    },
                })
                .then(res => res.json())
                .then(user => {
        
                    try{
        
                    loadUser(user[0]) 
                        
                    }
                    catch(err){
        
                        console.error(err)
                    }
                })
                .catch(
                    
                    
                )

            }catch(err){

                console.error(err)

            }

                 
             
        }

        fetchLoadUSer(auth.user_id, loadUser);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])
                


    return (
           auth?.access_token
           ? <Outlet />
           : <Navigate to={`/`} state={{  from: location }} replace/>
    );
}

export default RequireAuth;