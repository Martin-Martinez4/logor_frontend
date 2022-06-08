

export const userSearch = async (searchQuery:string) => {

    if(searchQuery === ""){
        return []
    }
    else{

        const usersObject = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/search/`, {
    
        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
    
            query: `${searchQuery}`
        }),
    
        })
        .then(users =>  {
            
            return users.json()
        })
        .catch(err => {
    
            return []
        });
    
        return usersObject
    }


}

export const tagSearch = async (searchQuery:string) => {

    if(searchQuery === ""){

        return [];
    }
    else{

    
        const tagssObject = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/tags/search/`, {
    
        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
    
            query: `${searchQuery}`
        }),
    
        })
        .then(tags =>  {
            
            return tags.json()
        })
        .catch(err => {
    
            return []
        });
    
        return tagssObject

    }

}

