
// API calls

export const getFollowersCount = async (user_id) => {

    const followersCount = await fetch(`http://localhost:3001/user/number/followers/${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(data =>  {
        
        return data.json()
    }) 
    .catch(err => {

        return "NA"

    });
    return followersCount
        
    
}

export const getFollowers = async (user_id) => {

    const followers = await fetch(`http://localhost:3001/user/followers?user_id=${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(users => {

        return users.json();
    })
    .catch(err => {

        return "Error"
    });

    return followers
}

export const getFollowingCount = async (user_id) => {

    const followingCount = await fetch(`http://localhost:3001/user/number/following/${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(data =>  {
        
        return data.json()
    })
    .catch(err => {

        return "NA"

    });

    return followingCount

}

export const getFollowees = async (user_id) => {

    const followees = await fetch(`http://localhost:3001/user/following?user_id=${user_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(users => {

        return users.json();
    })
    .catch(err => {

        return "Error"
    });

    return followees
}

export const isAFollowerOfB = async (follower_id, followee_id) => {

    // followee = being followed, follower subscribes to followee

    const isAFollowerOfB = await fetch('http://localhost:3001/is/follower/', {

        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            follower_id: follower_id,
            followee_id: followee_id
           
            })
        })
        .then(data =>  {
        
            return data.json()
        })
        .catch(err => {

            return false
        });


    return isAFollowerOfB


}

export const loggedIsFollower = async (followee_id) => {

    const isAFollowerOfB = await fetch('http://localhost:3001/user/is/follower/', {

        method: "post",
        credentials:'include',
        cache:'no-cache',
        headers: {
            
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({
                followee_id: followee_id,           
            })
        })
        .then(data =>  {
        
            return data.json()
        })
        .catch(err => {

            return false
        });


    return isAFollowerOfB
}

export const loggedIsFollowee = async (follower_id) => {

    const isAFollowerOfB = await fetch('http://localhost:3001/user/is/followee/', {

        method: "post",
        credentials:'include',
        cache:'no-cache',
        headers: {
            
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            follower_id: follower_id,           
        })
        })
        .then(data =>  {
        
            return data.json()
        })
        .catch(err => {

            return false
        });


    return isAFollowerOfB
}



