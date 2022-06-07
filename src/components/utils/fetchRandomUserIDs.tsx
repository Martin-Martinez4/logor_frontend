
export const getRandomUserIDs = async (number: number) => {

    const userIDs = await fetch(`http://localhost:3001/users/info/random/${number}`, {

        method: "get",
    headers: { "Content-Type": "application/json"},

    })
    .then(count =>  {
        
        return count.json()
    })
    .catch(err => {

        return []
    });

    return userIDs

}

