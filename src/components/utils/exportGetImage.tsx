
export const getImageString = `${process.env.REACT_APP_BACKEND_BASE_URL}/temp?filepath=`
export const serverAddressString = `${process.env.REACT_APP_BACKEND_BASE_URL}`

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

        return imageObjectURL
    })
    .catch(err => {

        return []
    });


    return image



}
