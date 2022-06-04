
import React, {useState, useEffect} from 'react';

import "./CheckmarkIcon.css";

const CheckmarkIcon = () => {

    const [animateClass, setAnimateClass] = useState(false);


    const handleAnimateClick = () => {

        setAnimateClass(!animateClass);
    

    }

    useEffect(() => {

    }, [animateClass])

    return(
        
        <div className='flexRowContainer2 fitContent'>

       
            <svg onClick={handleAnimateClick} className={animateClass?"svgCheckMarkIcon":""} width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_237_114)">
                    <rect width="3.42714" height="10.2814" rx="1.71357" transform="matrix(0.635711 -0.771927 0.635711 0.771927 4 10.8765)" fill="white"/>
                    <rect x="0.635711" width="2.42714" height="9.28143" rx="1.21357" transform="matrix(0.635711 -0.771927 0.635711 0.771927 4.23158 11.3672)" stroke="#338877" strokeOpacity="0.75"/>
                </g>
                <g filter="url(#filter1_d_237_114)">
                    <rect width="4.11257" height="20.5629" rx="2.05629" transform="matrix(0.635711 0.771927 -0.635711 0.771927 21.3857 0)" fill="white"/>
                    <rect y="0.771927" width="3.11257" height="19.5629" rx="1.55629" transform="matrix(0.635711 0.771927 -0.635711 0.771927 21.8765 0.176056)" stroke="#338877" strokeOpacity="0.75"/>
                </g>
                <defs>
                    <filter id="filter0_d_237_114" x="0.638184" y="9.00586" width="15.4385" height="17.0322" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_237_114"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_237_114" result="shape"/>
                    </filter>
                    <filter id="filter1_d_237_114" x="5.07959" y="0.929688" width="22.1548" height="25.188" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_237_114"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_237_114" result="shape"/>
                    </filter>
                </defs>
            </svg>

            <p className='icon__number'>10000000</p>

        </div>

    )
}

export default CheckmarkIcon;
