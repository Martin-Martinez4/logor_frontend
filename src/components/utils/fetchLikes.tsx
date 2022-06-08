
export const getLikesCount = async (comment_id: string) => {

    const count = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/count/likes/${comment_id}`, {

    method: "get",
    headers: { "Content-Type": "application/json"},

    })
    .then(count =>  {
        
        return count.json()
    })
    .catch(err => {

        return "NA"
    });

    return count

}

export const userLiked = async (comment_id: string ) => {

    

    const userLiked = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/liked/comment/`, {

        method: "post",
        credentials:'include',
        cache:'no-cache',
        headers: {
            
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            comment_id: comment_id,
           
        })

    })
    .then(isLiked => {

        // return isLiked.json()
        return isLiked.json()
    })
    .catch(err => {

        return

    })
    

    return userLiked

}

export const createLike = async (comment_id: string) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/add/like/`, {

        method: "post",
        credentials:'include',
        cache:'no-cache',
        headers: {
            
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            comment_id: comment_id,           
        })

    })
    .then(resp => {

        return resp
    })
    

    return response


}

export const deleteLike = async (comment_id: string ) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/delete/like/`, {

        method: "delete",
        credentials:'include',
        cache:'no-cache',
        headers: {
            
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            comment_id: comment_id,
           
        })

    })
    .then(resp => {

        return resp
    })
    

    return response

    
}
