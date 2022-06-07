
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserInfoContext from "../../context/UserInfoProvider";

import "./Signout.css";

// import SignoutIcon from "../../../assets/LogoutIcon.svg";


const Signout = () => {

    const navigate = useNavigate();

    const { unloadUser } = useContext( UserInfoContext);
    
    const { setAuth } = useAuth();

    const logoutProcess = async () => {

        console.log("got here")
        await fetch('http://localhost:3001/signout', {

            method: "get",
            credentials:'include',
            // cache:'no-cache',
            // headers: {
                
            //     'Content-Type': 'application/json',
            //   },
        })
        .then((response) => response.json())
        .then((user) => {

                
            unloadUser!()
            
            setAuth!(() => {
                
                return { user_id: "", access_token:"" }
            });
            
            navigate("/")

        }
        )
        .catch((err)=> console.log(err))

    }

    return (

        <>

            {/* <img src={SignoutIcon} alt="profile" className="sidebar_icon" onClick={logoutProcess}>
            </img> */}

            <svg onClick={logoutProcess} className="sidebar_icon svg_hoverable black_icon" width="35" height="30" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path onClick={logoutProcess} className="sidebar_icon svg_hoverable black_icon" d="M15 4L13.59 5.41L16.17 8H6V10H16.17L13.59 12.58L15 14L20 9L15 4ZM2 2H10V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H10V16H2V2Z" fill="black"/>
            </svg>
            <span className="sidebar_text" onClick={logoutProcess}><strong>Signout</strong></span>
        </>
    )
}

export default Signout;

