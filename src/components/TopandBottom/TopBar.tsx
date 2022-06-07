
import { FC, useEffect, createRef, useState } from "react";
import Logo from "../../assets/Logo3.svg";
import SearchBar from "../SearchBar/SearchBar";

import LeftsideCard from "../LeftsideCard/LeftsideCard";

import "./Nav.css";

const TopBar: FC = () => {

    const dropdownContainer = createRef<HTMLInputElement>()
    
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropDownVisible = () => {

        if(!dropdownVisible){

            setDropdownVisible(true)
        }
        else{

            setDropdownVisible(false)
        }

    }

            
    useEffect(() => {

        const handleClickOutside = (e: any ) => {

            if (
                dropdownContainer.current &&
                !dropdownContainer?.current?.contains(e.target)
                ) {
                    setDropdownVisible(false);
                }
        
                
                      
        };

        document.addEventListener("mouseup", handleClickOutside);


        return () => {

            document.removeEventListener("mouseup", handleClickOutside);
        }
      

    }, [dropdownVisible, dropdownContainer]);


    return(
        <>
        <nav className="topBar topBar2">
            <img src={Logo} className="topBar__logo"  alt="site logo"></img>

           <SearchBar></SearchBar>            
            
            <span className="sandwhich_container" onClick={toggleDropDownVisible}>
                <div className="dot topBar_sandwhich"></div>
                <div className="dot topBar_sandwhich"></div>
                <div className="dot topBar_sandwhich"></div>
                
                <span className={`dropdown ${dropdownVisible?"visible":"invisible"}`} ref={dropdownContainer}>

                    <LeftsideCard></LeftsideCard>

                </span>

        
            </span>        
        </nav>

        </>
        
    );
}

export default TopBar;
