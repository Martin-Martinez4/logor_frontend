
import React, { FC, JSXElementConstructor, useEffect, useState } from "react";
import MiniProfile from "../MiniProfile/MiniProfile";

import { userSearch, tagSearch } from "../utils/fetchSearchQuery";
import LoaderHOC from "../LoaderHOC/LoaderHOC";

import Scroll from "../Scroll/Scroll";


import "./searchbar.css";

type TagResult =  {
    tag_name: string,
    toLink: string
}[]

// type UsersResult =  {
//     id: string;
//     username: string;
//     nickname: string;
//     profile_pic_url: string;
//   }[]

type UsersResult = string[]


type ResState = {

    tagsResult: TagResult;
    usersResult: UsersResult;
}


// Make autocom appear only after something has been typed into the search bar

const SearchBar:FC = () => {

    const [searchState, setSearchState] = useState({

        topBarSearch:""
    });

    const [searchResults, setSearchResults] = useState<ResState>({

        tagsResult: [],
        usersResult: []
    })

    const [ autocomIsLoading, setAutocomIsLoading ] = useState<boolean>();


    // const [throttle, setThrottle] = useState(false);

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e === null){
            return
        }

        setSearchState(prev => ({ ...prev, [e.target.name]: e.target.value }))


        e.preventDefault()
    }

    useEffect(() => {

        
        // console.log(searchState.topBarSearch)
        // in timeout, set throttle true api call
        

            // setThrottle(true)

            setAutocomIsLoading(true)

            setTimeout(async () => {
    
                // setThrottle(false);

                let usersResult = []
                let tagsResult = []
    
                const searchQuery = searchState.topBarSearch
    
                // console.log("searchQuery: ", searchQuery)
                const usersSearchResults = await userSearch(searchQuery) 
                const tagsSearchResults = await tagSearch(searchQuery)
    
                // console.log("users search result: ", usersSearchResults)
                // console.log("tags search result: ", tagsSearchResults)

                for(let i = 0; i < usersSearchResults.length; i++){

                    // console.log("sersSearchResults[i][id]: ", usersSearchResults[i]["id"])

                    usersResult.push(usersSearchResults[i]["id"])
                }

                for(let i = 0; i < tagsSearchResults.length; i++){

                    const tag_name: string = tagsSearchResults[i]["tag_name"].substring(1,)

                    tagsResult.push( {
                        tag_name: tag_name,
                        toLink: `/tags/name/${tag_name}`
                    })
                }

                // console.log("userResult:  ",usersResult)
                // console.log("tagResult:  ",tagsResult)

                setSearchResults({usersResult:usersResult, tagsResult:tagsResult})
                setAutocomIsLoading(false)
                // setSearchResults({usersResult:usersResult, tagsResult:tagsResult})
    
    
    
    
            }, 600)

        
    },[searchState])

    useEffect(()=> {
        // console.log(searchResults.tagsResult, searchResults.usersResult)

    }, [searchResults.usersResult, searchResults.tagsResult])


    return (

        <div className="searchBar_container relative">

            <input type="search" id="topBarSearch" name="topBarSearch" value={searchState.topBarSearch} onChange={oninputChange} placeholder="Search..." className="topBar__search contained" >
                
            </input>
            <div className="autocom-box height50">
                <Scroll classNames=" height100Percent">
                    <p className="autocom_category" >Users</p>
                    <div className="autocom_category">

                        <LoaderHOC loading={ autocomIsLoading } >

                            console.log(searc)

                            {searchResults.usersResult.map((id) => {

                                console.log({id})
                                return <MiniProfile key={`miniProfile${id}`} user_id={id}/>
                            })}
                        </LoaderHOC>
                    </div>

                    <p>Tags</p>
                    <div className="autocom_category" >
                        <LoaderHOC loading={ autocomIsLoading }>

                            {searchResults.tagsResult.map((tag_name) => (
                                <p>
                            
                                    <a className="autocom_link" href={tag_name.toLink} >{tag_name.tag_name}</a>
                                </p>
                            ))}
                    </LoaderHOC>
                    
                    </div>

                </Scroll>
            </div>

        </div>

    )


}

export default SearchBar

