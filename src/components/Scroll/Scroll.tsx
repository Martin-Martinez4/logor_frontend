import React, { FC, PropsWithChildren } from 'react';
import "./scroll.css";

type ScrollProps = {

    classNames?: string;
}

const Scroll: FC<ScrollProps> = ({ children, classNames }) => {

    return (
        <div className={'scroll_div ' + classNames}>

            {children}

        </div>
    );

}

export default Scroll
