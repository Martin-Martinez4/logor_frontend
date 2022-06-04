import React, { FC, PropsWithChildren } from 'react';
import "./scroll.css";

type Props = PropsWithChildren<{
  }>

const Scroll: FC<Props> = ({ children, classNames }) => {

    return (
        <div className={'scroll_div ' + classNames}>

            {children}

        </div>
    );

}

export default Scroll
