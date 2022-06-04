
export const formatNumber = (number:number) => {

    if (number < 1000){

        return number.toString();

    }
    else if(number >= 1000 && number < 1000000){

        return ((number/1000).toFixed(2)).toString() +"k";
    }
    else if(number >= 1000000 && number < 1000000000){

        return ((number/1000000).toFixed(2)).toString() + "M";
    }
    else if(number >= 1000000000 && number < 1000000000000000000){

        return ((number/1000000000).toFixed(2)) + "B";
    }
    else{

        return ((number/1000000000000000000).toFixed(2)) + "T";
    }

}

