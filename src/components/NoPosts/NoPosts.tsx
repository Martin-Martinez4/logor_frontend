
import { FC } from "react";
import Card from "../Card/Card";

const NoPosts:FC = () => {

    return (

        <Card classes="profile_header_background CenterText">
            <h1>No Posts Made Yet...</h1>
            <h2>Check for posts later</h2>
        </Card>
    )
}

export default NoPosts;


