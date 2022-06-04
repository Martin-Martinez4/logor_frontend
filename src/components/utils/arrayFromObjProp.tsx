
export const arrayFromObjProp = (objectName, prop) => {

    // console.log("objectProp: ", objectName)

    // if(objectName.length === 0 || objectName.message){

    //     return [];

    // }
    
    return objectName?.map((object) => {

        return object[`${prop}`]

    })

}

