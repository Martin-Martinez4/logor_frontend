
import  {refreshToken} from "./refreshToken";

export const refreshTokenBool = async (auth, setAuth) => {

    try {
        
        await refreshToken(setAuth);
        return true;
    }
    catch (err) {
        console.error(err);

        return false
    }
 

}
