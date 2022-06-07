
import { useEffect, useState, FC } from 'react';

import "./HeartIcon2.css";

import { formatNumber } from '../../../components/utils/formatNumber';

import { userLiked } from '../../../components/utils/fetchLikes';
import { deleteLike, createLike, getLikesCount } from '../../../components/utils/fetchLikes';

type HeartIcon2Props = {

    comment_id: string;
    loggedInId: string;
}

export const HeartIcon2: FC<HeartIcon2Props> = ({ comment_id, loggedInId }) => {

    const [loginError, setLoginError] = useState({

        inputError:false,
        flagTripped: false
    });

    const [animateClass, setAnimateClass] = useState(false);

    const [numberOfLikes, setNumberOfLikes] = useState();
    const [loggedInLiked, setLoggedInLiked] = useState(false);


    const handleAnimateClick = async () => {

    

        if(loggedInId === undefined){

            return
        }

        if(loggedInLiked){
            // Liked already and clcked
            await deleteLike(comment_id)

            
        }else{

            console.log("create like")

            await createLike(comment_id)
        }
        
        let tempLiked = await userLiked(comment_id);

        let numLikes = await getLikesCount(comment_id)

        setNumberOfLikes(numLikes)

        setAnimateClass(tempLiked)
        setLoggedInLiked(tempLiked)
        setAnimateClass(!animateClass);
    
    }

    useEffect(() => {

        (async (comment_id, setNumberOfLikes) => {

            let numLikes = await getLikesCount(comment_id)

            setNumberOfLikes(numLikes)

        })(comment_id, setNumberOfLikes);


        (async (comment_id, loggedInId, userLiked) => {

            console.log(comment_id)

            console.log("heart SVG: ", loggedInId)

            let tempLiked;

            if(loggedInId === undefined){

                tempLiked = false;

            }else{

                tempLiked = await userLiked(comment_id);

                if(tempLiked){

                    setAnimateClass(tempLiked)
                }
            }

            setLoggedInLiked(tempLiked)


            // console.log("loogined: ", loggedInLiked)
            
            // get didLoggedInLike
            // set animateClass to didLoggedInLike response
    
            // get likeCount
            // store likeCount
        })(comment_id, loggedInId, userLiked);

    },[])

    useEffect(() => {

        // console.log(animateClass);

    }, [animateClass])

    return (
        <div className='flexRowContainer2 fitContent'>

            <svg onClick={handleAnimateClick} className={animateClass?"svgHeart":""} width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_237_118)">
                    <path d="M24 3.56303C24 8.46927 18.2849 16 13.8667 16C9.44839 16 4 8.46927 4 3.56302C4 -1.34322 10.6667 -1.02955 13.8667 3.56305C17.3333 -0.582605 24 -1.34322 24 3.56303Z" fill="white"/>

                    <path d="M13.4564 3.84889L13.8305 4.38574L14.2502 3.88379C15.9027 1.90761 18.3096 0.756187 20.2559 0.668065C21.2254 0.624172 22.0326 0.844671 22.5882 1.29772C23.13 1.73959 23.5 2.45753 23.5 3.56303C23.5 5.85695 22.145 8.85813 20.1986 11.3105C19.2323 12.5279 18.1399 13.5844 17.0338 14.3325C15.9222 15.0844 14.8343 15.5 13.8667 15.5C12.9004 15.5 11.8303 15.0854 10.7454 14.3354C9.66533 13.5887 8.6064 12.5337 7.67322 11.3171C5.79452 8.86762 4.5 5.8639 4.5 3.56302C4.5 2.45699 4.87101 1.70332 5.42033 1.22417C5.97917 0.736721 6.78089 0.482989 7.72385 0.500881C9.61751 0.536811 11.9404 1.67312 13.4564 3.84889Z" stroke="#A4351F"/>

                </g>
                <defs>

                <filter id="filter0_d_237_118" x="0" y="0" width="28" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_237_118"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_237_118" result="shape"/>
                </filter>
                </defs>
            </svg>

                {/* <span className='icon__number tooltip'>Log in to like comments</span> */}


            <p className='icon__number'>{formatNumber(numberOfLikes)}</p>

            
        </div>
        
    )
  }

  export default HeartIcon2;


