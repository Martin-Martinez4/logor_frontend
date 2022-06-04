

import { useContext, useDebugValue } from "react";
import UserInfoContext from "../context/UserInfoProvider";

const useUserInfo = () => {
    // const { auth } = useContext(AuthContext);
    // useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(UserInfoContext);
}

export default useUserInfo;