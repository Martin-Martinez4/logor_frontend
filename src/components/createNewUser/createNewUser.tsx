// Change to creat new user in database


import { v4 as uuidv4 } from 'uuid';


function createNewUser(user, data){

    // console.log(data);

    const newUserId = uuidv4();

    data["login"][newUserId] = {
                                "username":"", 
                                "password":""
                            };

    data["users"][newUserId] = {
                                "username":"",
                                "tag":"", 
                                "profile_pic_url":""
                            };

    data["headers"][newUserId] = {
                                    "description": "",
                                    "header_img_url": "",
                                    "location": "",
                                    "links": "",
                                    "joined_date": ""
                                
                                };

    for (let key of Object.keys( data["login"][newUserId])){

        data["login"][newUserId][key] = user[key];
    }

    for (let key of Object.keys( data["users"][newUserId])){

        // if profile_pic_url
        if (key === "profile_pic_url"){
    
            let test = user[key].split("/");
            test = test[test.length -1];
            console.log("test", test[test.length -1]);
            test = "../../default/"+test;
            console.log("test2", test);
        }

        data["users"][newUserId][key] = user[key];
    }

    for (let key of Object.keys( data["headers"][newUserId])){

        // if header_img_url
        // data["headers"][newUserId][key] = 



        data["headers"][newUserId][key] = user[key];
    }

    const userData = Object.assign({id: newUserId}, data["users"][newUserId], data["headers"][newUserId])


    return userData;


}


export default createNewUser;

