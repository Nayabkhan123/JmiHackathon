import React from 'react'
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

export const uploadImage = async(image) => {
    const formdata=new FormData()
    formdata.append("file",image)
    formdata.append("upload_preset","Hackathon")
    const apiresponse = await fetch(url,{
        method:"post",
        body: formdata,
    })
    console.log("cloudinary",apiresponse)
    return apiresponse.json()
}
