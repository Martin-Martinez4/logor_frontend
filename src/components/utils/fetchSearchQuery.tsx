

export const userSearch = async (searchQuery:string) => {

    if(searchQuery === ""){
        return []
    }
    else{

        const usersObject = await fetch(`http://localhost:3001/users/search/`, {
    
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

    
        const tagssObject = await fetch(`http://localhost:3001/tags/search/`, {
    
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

