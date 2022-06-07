
function formatDate(UTCDate: string){

    const newDate = new Date(UTCDate);

    const time = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric',  hour12: true })

    const monthsArray:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const daysArray:string[] = ['Sun','Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

    let readableDateDayOfWeek:string =daysArray[newDate.getDay()];
    let readableDateMonth:string = monthsArray[(newDate.getMonth())];
    let readableDateDay:string = newDate.getDate().toString().length === 1? "0"+newDate.getDate().toString(): newDate.getDate().toString();
    let readableDateFullYear:string = (newDate.getFullYear().toString());

    return ` ${readableDateDayOfWeek} ${readableDateMonth}-${readableDateDay}-${readableDateFullYear} • ${time}`;

};

export function formatDateMonthDayYear(UTCDate: string){

    const newDate = new Date(UTCDate);

    // const time = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric',  hour12: true })

    const monthsArray:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    let readableDateMonth:string = monthsArray[(newDate.getMonth())];
    let readableDateDay:string = newDate.getDate().toString().length === 1? "0"+newDate.getDate().toString(): newDate.getDate().toString();
    let readableDateFullYear:string = (newDate.getFullYear().toString());

    return ` ${readableDateMonth}-${readableDateDay}-${readableDateFullYear}`;

};

export function formatDateAgo(UTCDate: any){

    const oldTime = (new Date(UTCDate).getTime())/1000;

    const currTimeSec = (new Date().getTime())/1000;

    const timeDifference = currTimeSec - oldTime;

        // 0 to 60 = secs ago
        // 60 to 3600 = minutes secs ago
        // 3600 to 86400 = hours minutes ago
        // 86400 to 259200 = days hours minutes ago (up to 3 days)
        // after just do format date

        let formattedDate;
        // let dateDays;
        let dateHours;
        let dateMinutes;
        let dateSeconds;

        let intPortion;
        let decimalPortion;


        if(timeDifference >= 0 && timeDifference < 60){


            formattedDate = (timeDifference.toFixed(2)).toString() + " seconds ago"
        }
        else if(timeDifference >= 60 && timeDifference< 3600){
            
            intPortion = parseInt((((timeDifference/60).toString()).split("."))[0])

            decimalPortion = (timeDifference/60) - intPortion;

            dateMinutes = Math.floor(intPortion);
            dateSeconds = ((decimalPortion)*60).toFixed(2);

            formattedDate = dateMinutes.toString()+ " minutes, " + (dateSeconds).toString() + " seconds ago"
        }

        else if(timeDifference >= 3600 && timeDifference < 86400){

            intPortion = parseInt((((timeDifference/3600).toString()).split("."))[0])

            decimalPortion = (timeDifference/3600) - intPortion;

            dateHours = Math.floor(intPortion);
            dateMinutes = ((decimalPortion)*60).toFixed(2);

            formattedDate = dateHours.toString()+ " hours, " + (dateMinutes).toString() + " minutes ago"


        }
        else if(timeDifference >= 86400 && timeDifference < 259200){

            intPortion = parseInt((((timeDifference/86400).toString()).split("."))[0])

            decimalPortion = (timeDifference/86400) - intPortion;

            dateHours = Math.floor(intPortion);
            dateMinutes = ((decimalPortion)*24).toFixed(2);

            formattedDate = dateHours.toString()+ " days, " + (dateMinutes).toString() + "hours ago"

        }
        else{

            formattedDate = formatDate(UTCDate);
        }

        return formattedDate

};   


export default formatDate;

