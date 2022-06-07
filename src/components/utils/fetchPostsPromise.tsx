
export const getHomePosts = async () => {

    
    const promise = await fetch(`http://localhost:3001/home/`, {
        method: "get",
        credentials:'include',
            cache:'no-cache',
            headers: {
                
                'Content-Type': 'application/json',
              },
    }).then(response => response.json())

    return promise

}

export const getResponsesPosts = async (parent_id: string) => {

    const promise = await fetch(`http://localhost:3001/responses/${parent_id}`, {

        method: "get",
        cache:  "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(responses => responses.json())

    return promise
}
