
export const getUserIdByNickname = async (nickname) => {

    const user_id = await fetch(`http://localhost:3001/userID/${nickname}`, {

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

