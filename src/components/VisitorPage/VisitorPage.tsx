

import React, { FC } from "react";
import {
    useParams
  } from "react-router-dom";
import TopBar from "../TopandBottom/TopBar";
import VisitorContentArea from "../ContentArea/VisitorContentArea";

const Homepage:FC = () => {

    const {id} = useParams();

    return(
        <React.Fragment>
            {console.log(id)}
            <TopBar />
            <VisitorContentArea userOrTagID={id?.toString()} />
        </React.Fragment>
    );

}

export default Homepage



