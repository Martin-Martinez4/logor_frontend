
import { FC, ReactElement, ReactNode } from "react";

import Loader1 from "../svg/Loader1/Loader1"
import Loader2 from "../svg/Loader1/Loader2";


type LoaderInterface = {
    
    loading?: boolean;
    loader?: number

}

const LoaderHOC: FC<LoaderInterface> = ({ children, loading, loader }): ReactNode | ReactNode[] | any=> {

    if(loading){

        if(loader === 2){

            return <Loader2></Loader2>

        }
        else{
            
            return (<Loader1></Loader1>)
        }

    }
    else{

        return (
            [children]
        )

    }

}

export default LoaderHOC
