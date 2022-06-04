
import React, { ReactElement }from "react";
import TopBar2 from "../TopandBottom/TopBar2";
import BottomBar from "../TopandBottom/BottomBar";
import Signin from "../Siginin/Signin";

import "./landingPage.css";



const Landingpage = ({ loadUser }):ReactElement => {
    // Photo by <a href="https://unsplash.com/@ryunosuke_kikuno?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ryunosuke Kikuno</a> on <a href="https://unsplash.com/s/photos/green?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

    return(
  
        <React.Fragment>

            <TopBar2 />
            <div className="landingPage">

                <div className="signin_image_container ">
                    <div className="image landingImage" ></div>
                </div>

                    <Signin reDirect={true} />

            </div>
            <BottomBar />

        </React.Fragment>


    );

}

export default Landingpage;

