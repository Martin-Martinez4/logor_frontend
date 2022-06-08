
export const checkIfUsernameExists = async (username:string) => {

    const ifExists =  await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/available/username?username=${username}`, {

            method: "get",
            headers: { "Content-Type": "application/json"},
        
        })
        .then(response => {

            return response.json()
        })
        .catch(err => console.log(err))
    
    return ifExists 

}

export const checkIfNicknameExists = async (nickname:string) => {

    const ifExists =  await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/available/nickname?nickname=${nickname}`, {

            method: "get",
            headers: { "Content-Type": "application/json"},
        
        })
        .then(response => {

            return response.json()
        })
        .catch(err => console.log(err))

    return ifExists 

}

