
 const getTagsMentionssLinks = (text_string: string) => {

    if(text_string === null || text_string === undefined){
        text_string = "";
    }

    //eslint-disable-next-line
    const pattern = /(#|@)[a-zA-Z]{1}[\-a-zA-Z0-9]{1,20}|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

    let match;

    let tempArray = [];

    // let startOfText = true;

    let tempPrevIndex;

    while((match = pattern.exec(text_string))){

        tempArray.push([text_string.substring(tempPrevIndex as number, match.index)])
        tempArray.push([text_string.substring(match.index, pattern.lastIndex)])

        tempPrevIndex = pattern.lastIndex;

    }

    if(tempPrevIndex !== text_string.length){

        
        tempArray.push([text_string.substring(tempPrevIndex as number, text_string.length)])
    }

    return tempArray;
}

export default getTagsMentionssLinks;

