
export const getImageString = "http://localhost:3001/temp?filepath="
export const serverAddressString = "http://localhost:3001"

// Set in component as such:
// ( async (getProfileImage, setPictures) => {

    //         const profileBlob = await getProfileImage(loggedInUser["profile_pic_url"])

    //         console.log("profileBlob: ", profileBlob)
    //         setPictures(prev => ({...prev, profileImage: profileBlob}))
    //     })(getProfileImage, setPictures)

export const getProfileImageBlob = async (filePath: string) => {

    const image = await fetch(`${getImageString}${filePath}`)
    .then(response => response.blob())
    .then(imageBlob => {
        // Then create a local URL for that image and print it 
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log("imageObjectURL: ", imageObjectURL);

        return imageObjectURL
    })
    .catch(err => {

        return []
    });

    console.log("image: ", image)

    return image



}
