
import { Dispatch, SetStateAction } from "react";
import  {refreshToken} from "./refreshToken";

type Auth = {
    access_token?: string;
    user_id?: string;
}


export const refreshTokenBool = async (setAuth: Dispatch<SetStateAction<Auth>>) => {

    try {
        
        await refreshToken(setAuth);
        return true;
    }
    catch (err) {
        console.error(err);

        return false
    }
 

}
