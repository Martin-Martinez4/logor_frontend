
// followee = being followed
export const createFollow = async (followee_id: string) => {

    const followResponse = await fetch(`http://localhost:3001/following/create/`, {

            method: "post",
            credentials:'include',
            cache:'no-cache',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                followee_id: followee_id,
            
            })
        })
        .then(response => {

            return response.json()
        })
        .catch(err => console.log(err))
        
    return followResponse
}

export const deleteFollow = async (followee_id: string) => {

    const followResponse = await fetch(`http://localhost:3001/following/delete/`, {

        method: "delete",
        credentials:'include',
        cache:'no-cache',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            followee_id: followee_id,
        
        })
    })
    .then(response => {

        return response.json()
    })
    .catch(err => console.log(err))

return followResponse



}


