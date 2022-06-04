
import { FC } from "react";

import Card from "../Card/Card";

const UserNotFOund:FC = () => {

    return (

        <Card classes="profile_header_background CenterText">
            <h1>User Not Found</h1>
            <h4>to go back home <a href="/"> Click Here</a></h4>
        </Card>
    )
}

export default UserNotFOund


