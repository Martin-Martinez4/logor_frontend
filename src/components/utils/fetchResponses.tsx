
export const getRespones = async (comment_id) => {

    const responsesComments = await fetch(`http://localhost:3001/responses/${comment_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},
    
        })
        .then(responses =>  {
            
            return responses.json()
        })
        .catch(err => {
    
            return "NA"
        });
    
    return responsesComments

}
export const getResponsesCount = async (comment_id) => {

    const responsesCount = await fetch(`http://localhost:3001/responses/count/${comment_id}`, {

        method: "get",
        headers: { "Content-Type": "application/json"},
    
        })
        .then(count =>  {
            
            return count.json()
        })
        .catch(err => {
    
            return "NA"
        });
    
    return responsesCount

}

export const addResponse = async (parent_id, comment_id) => {

    const response = await fetch(`http://localhost:3001/thread/add/response/`, {

            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                parent_id: parent_id,
                comment_id: comment_id 
            
            })
    
        })
        .then(comment_id =>  {
            
            return comment_id.json()
        })
        .catch(err => {
    
            return "NA"
        });
    
    return response


}





