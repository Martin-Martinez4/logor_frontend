
import { FC, useEffect, useState } from "react";

import SideCard from "../SideCards/SideCard";
import VisitorPostList from "../PostList/VisitorPostList";

import { getRandomUserIDs } from "../utils/fetchRandomUserIDs";
import { createMiniProfiles } from "../utils/createMiniprofilesArray";

import LeftsideCard from "../LeftsideCard/LeftsideCard";

import"./contentArea.css";

type userOrTagID = {

    userOrTagID: string
}

const VisitorContentArea:FC<userOrTagID> = ({ userOrTagID }) => {

    const [ suggestedProfiles, setSuggestedProfiles ] = useState();

    let miniprofilesArray = [];

    // get three random user_ids
    useEffect(() => {

        (async (setSuggestedProfiles) => {

            const featuredUsers = await getRandomUserIDs(3);

            setSuggestedProfiles(featuredUsers)

            
        })(setSuggestedProfiles)
        
        
    }, [])


    miniprofilesArray = createMiniProfiles(suggestedProfiles ? suggestedProfiles : []);


    return (
        

        <div className="contentArea">
            
  
            <SideCard side="leftSide">
                <LeftsideCard></LeftsideCard>

            </SideCard>
            <div>
                <VisitorPostList userOrTagID={ userOrTagID }/>
            </div>
            <SideCard side="rightSide" >
                <h3 className="header">Suggestions</h3>
                <p className="rightSide_content suggestion_content">#returnToMonkey</p>
                <p className="rightSide_content suggestion_content">#DonkeyKong</p>

                <h3 className="header">Featured</h3>

               
                <div className="rightSide_content featured_content">
                    
                    {miniprofilesArray}
                </div>
                       
            </SideCard> 
        </div>

    );


}

export default VisitorContentArea;