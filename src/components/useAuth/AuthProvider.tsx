import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { StructuredType } from "typescript";

type Auth = {
    access_token?: string;
    user_id?: string;
}

type authContext = {

    auth: Auth;
    setAuth:  Dispatch<SetStateAction<Auth>>;
}

const AuthContext = createContext<Partial<authContext>>({});

export const AuthProvider:FC = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;