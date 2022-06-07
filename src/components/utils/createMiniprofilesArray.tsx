
import MiniProfile from "../MiniProfile/MiniProfile"



 export const createMiniProfiles = (suggestedProfiles: {[key: string]: string}[]) => {

    let profilesArray = []

    for(let i = 0; i < suggestedProfiles?.length?suggestedProfiles.length:0; i++){

        // console.log("for loop ssuggestedProfiles[i][id]: ", suggestedProfiles)

        profilesArray.push( <MiniProfile key={`${new Date()}_${suggestedProfiles[i]["id"]}`} user_id={suggestedProfiles[i]["id"]} ></MiniProfile>)

    }

    return profilesArray
}
