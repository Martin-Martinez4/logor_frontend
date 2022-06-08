
export const getMiniProfileInfo = async (user_id: string) => {

    const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/info/miniprofile/${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

        })
        .then(info => {


            return info.json()
        })
        .catch(err => {
            console.log(err)

            return "error"
        })

    return userInfo


}
