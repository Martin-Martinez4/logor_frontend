
const getMentions = (text_string: string) => {

    if(text_string === null || text_string === undefined){
        text_string = "";
    }


    //eslint-disable-next-line
    const pattern = /(@)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,}/g;

    let match;

    let tempArray = [];


    while((match = pattern.exec(text_string))){

        tempArray.push([text_string.substring(match.index, pattern.lastIndex)])


    }


    return tempArray;
}

export default getMentions;

