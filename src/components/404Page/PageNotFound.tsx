
import { FC } from "react";

import Card from "../Card/Card"


const PageNotFound:FC = () =>{

    return(

        <Card classes="coverPage CenterText">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <h3>Something coming soon</h3>
            <h4>to go back home <a href="/"> Click Here</a></h4>
        </Card>
    )


}

export default PageNotFound;