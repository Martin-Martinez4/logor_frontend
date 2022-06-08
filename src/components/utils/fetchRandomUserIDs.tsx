
export const getRandomUserIDs = async (number: number) => {

    const userIDs = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/info/random/${number}`, {

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

