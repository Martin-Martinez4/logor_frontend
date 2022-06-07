
import React,{ PropsWithChildren, FC  } from "react";
import "./Cards.css"

type Props = PropsWithChildren<{
    classes: string,
    cardStyle?: object,
  }>

const Card:FC <Props> = ({ children, classes="", cardStyle }) => {

    return (

        <div className={"card " + classes} style={cardStyle}>
                {children}
        </div>
    );
}

export default Card;



