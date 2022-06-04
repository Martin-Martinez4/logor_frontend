
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderHOC from "../../LoaderHOC/LoaderHOC"
import { formatNumber } from "../../utils/formatNumber";
import { getResponsesCount } from "../../utils/fetchResponses"
import "./ResponsesIcon.css";

const ResponsesIcon = ({ comment_id }) =>  {

    const navigate  = useNavigate();

    const [numberOfResponses, setNumberOfResponses] = useState();
    const [likeIsLoading, setLikeIsLoading] = useState();

    useEffect(() => {

        // fetch number responses
        // /responses/count/:parent_id

        let isMounted = true; 

        const functionThatRuns = async (parent_id) => {

            const numResponses = await getResponsesCount(parent_id);

            if(isMounted){

                setNumberOfResponses(numResponses);
            }
            else{

                return 
            }

            
        }
        
        functionThatRuns(comment_id)

        return () => { isMounted = false };



    }, [])

    const NavigateToThreadView = () => {

        navigate(`/thread/${comment_id}`)
    }



    return (
        <div className='flexRowContainer2 fitContent' onClick={() => NavigateToThreadView()}>
            <LoaderHOC loading={likeIsLoading} loader={2}>

            <svg className="pointer" width="24px" height="24px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg">
                <title>Responses</title>
                <g id="comment-Filled" className="responses_icon">
                    <path id="comment-Filled-2" data-name="comment-Filled" className="cls-1" d="M21.5,8v6A4.505,4.505,0,0,1,17,18.5H6.829a1.491,1.491,0,0,0-1.061.439L3.354,21.354A.5.5,0,0,1,3,21.5a.512.512,0,0,1-.191-.038A.5.5,0,0,1,2.5,21V8A4.505,4.505,0,0,1,7,3.5H17A4.505,4.505,0,0,1,21.5,8Z"/>
                </g>
            </svg>


            <p className='icon__number'>{formatNumber(numberOfResponses)}</p>
            </LoaderHOC>

            
        </div>
        
    )
}

export default ResponsesIcon;

