
export const getUserIdByNickname = async (nickname: string) => {

    const user_id = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/userID/${nickname}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

        })
        .then(data =>  {

            
            return data.json()
        })

        .catch(err => {

            console.log(err)
            return "NA"

        });

        console.log("userInfoFetch: ",user_id)

    return user_id["id"]


}

