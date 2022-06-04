
import React, { FC } from "react";
import TopBar from "../TopandBottom/TopBar";
import SigninModalHOC from "../SigninModal/SigninModalHOC";
import ContentArea from "../ContentArea/ContentArea";

const Homepage:FC = () => {


    return(
        <React.Fragment>
            <TopBar />
            <SigninModalHOC>

                <ContentArea />
            </SigninModalHOC>
        </React.Fragment>
    );

}

export default Homepage

