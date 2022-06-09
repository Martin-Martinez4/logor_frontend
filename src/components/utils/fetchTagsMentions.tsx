
export const fetchTagNameByComment = async (comment_id: string) => {
    const test = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/tags/byName/comment/${comment_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(data =>  {
        
        return data.json()
    });

    return test
   
}

export const fetchMentionsByComment = async (comment_id : string) => {
    const test = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/mentions/byName/comment/${comment_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},

    })
    .then(data =>  {
        
        return data.json()
        
    }).catch(err => {

        console.log(err)
    });

    return test
   
}


export const insertTagIfNotExist = async (tagname: string) => {


        await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/create/tag/`, {

            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                tag_name: tagname, 
               
            })

        })
        

    return "Done"

}


export const insertTagCommentRelation  = async (tagName: string, comment_id: string) => {


        await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/addTag/`, {

            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                tag_name: tagName,
                comment_id: comment_id
               
            })

        })
        .then((response) => response.json())

        // Add tag_id, comment_id pair to tag_comment
        
    return "Done"

}


export const insertMentionRelation  = async (mentioned_nickname: string, comment_id:  string) => {


        await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/addMention/`, {

            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                nickname: mentioned_nickname,
                comment_id: comment_id
               
            })

        })
        .then((response) => response.json())

        // Add tag_id, comment_id pair to tag_comment
        
    return "Done"

}

export const deleteTagCommentRelation  = async (tagName: string, comment_id:  string) => {

    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/deleteTag/`, {

        method: "delete",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            tag_name: tagName,
            comment_id: comment_id
            
        })

    })
    .then((response) => response.json())
    

    return "Done"
        
}

export const deleteMentionRelation  = async (mentioned_nickname: string, comment_id: string) => {

    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/comment/deleteMention/`, {

        method: "delete",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            nickname: mentioned_nickname,
            comment_id: comment_id
            
        })

    })
    .then((response) => response.json())
    

    return "Done"
        
}

export const fetchForEachIndexInAnArray = async (array: any, fetchFunction: any) => {

    const arrLen = array.length;
    
    for(let i = 0; i < arrLen ; i++){

        await fetchFunction(array[i]);
    }

}

export const fetchForEachIndexInAnArrayCommentID = async (array: any, comment_id: string, fetchFunction: any) => {

    const arrLen = array.length;
    
    for(let i = 0; i < arrLen ; i++){

        await fetchFunction(array[i], comment_id);
    }

}


