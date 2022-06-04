
import { FC, PropsWithChildren } from "react";

import Card from "../Card/Card";

type PropsSideCard = PropsWithChildren<{

    side: string

}>

const SideCard: FC<PropsSideCard> = ({ children, side }) => {

    return (

        <Card classes={side + " sideCard"} >
          
            {children}
        </Card>

    );


}

export default SideCard;
