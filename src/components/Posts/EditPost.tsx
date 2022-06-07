

import { FC } from "react";

import Card from "../Card/Card";
import "./Posts.css";

type uuid = {

        uuid: string;
}

const EditPost: FC<uuid> = ({ uuid }) => {
 

        return(
            <Card classes="content post deleted">
           
                <p className="post_body_text">This Post was Deleted by the user</p>
                
           
        </Card>
        );
}

export default EditPost;

