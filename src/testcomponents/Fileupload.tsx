
import { FC, useState } from "react";

const Fileupload:FC = () => {

    const [uploadStatus, setUploadStatus] = useState('');

    const [uploadedImage, setUploadedImage] = useState<string | Blob>();

    const imageHandler = (e: { target: { files: any[]; }; }) => {

        const file = e?.target.files[0];

        setUploadedImage(file)
    }

    const onSubmitImage = () => {

        const formData = new FormData()

        formData.append('image', uploadedImage? uploadedImage : "")

        fetch(`http://localhost:3001/api/image/`, {

            method: 'POST',
            body: formData,
            headers:{
                'Accept': 'multipart/form-data',
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(res => {

            setUploadStatus(res.msg)
        })
        .catch( err => console.error(err))
    }

    return(
        <>
            <p>{uploadStatus}</p>

            <input type="file" name="image" accept="image/*" multiple={false} onChange={() => imageHandler} />
            <input type="submit" onClick={onSubmitImage} />
        </>
    )

}

export default Fileupload;

