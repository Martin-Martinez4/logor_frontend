
export const arrayFromObjProp = (objectName: { [key: string]: any }[], prop: string) => {


    // if(objectName.length === 0 || objectName.message){

    //     return [];

    // }
    
    return objectName?.map((object) => {

        return object[`${prop}`]

    })

}

