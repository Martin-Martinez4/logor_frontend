
export const getRespones = async (comment_id: string) => {

    const responsesComments = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/responses/${comment_id}`, {

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
export const getResponsesCount = async (comment_id: string) => {

    const responsesCount = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/responses/count/${comment_id}`, {

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

export const addResponse = async (parent_id: string, comment_id: string) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/thread/add/response/`, {

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





