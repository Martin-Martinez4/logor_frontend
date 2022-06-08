
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {

        // get refresh token like in siginin
        await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/token/refresh/`, {

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
            
            
            if(user.access_token){

                if(setAuth){

                    setAuth(prev => {
                        return { 
                            ...prev, 
                            user_id: user.user_id,
                            access_token:user.access_token  
                        }
                    });
    
                }
                
                return user.access_token;

              
                    
                

                   
            }
            else{

                console.log("error")

                return null

            }
        })
    
    }

    return refresh;
};

export default useRefreshToken;