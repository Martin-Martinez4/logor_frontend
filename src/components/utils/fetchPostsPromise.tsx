
export const getHomePosts = async () => {

    
    const promise = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/`, {
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

    const promise = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/responses/${parent_id}`, {

        method: "get",
        cache:  "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(responses => responses.json())

    return promise
}
