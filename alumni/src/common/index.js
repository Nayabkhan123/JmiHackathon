const backendDomain = "http://localhost:8000/api";

const backendUrl = {
    register: {
        url: `${backendDomain}/register`,
        method: "post",
    },
    login: {
        url: `${backendDomain}/login`,
        method: "post"
    },
    curruser:{
        url: `${backendDomain}/user-details`,
        method: "get"
    },
    logout:{
        url:`${backendDomain}/logout`,
        method:"get"
    },
    curruser:{
        url: `${backendDomain}/user-details`,
        method: "get"
    },
    searchAlumni:{
        url: `${backendDomain}/search-alumini`,
        method: "post"
    },
    getAlumni:{
        url: `${backendDomain}/all-alumni`,
        method: "get"
    },
    updateProfile:{
        url: `${backendDomain}/edit-profile`,
        method: "put"
    },
    createPost:{
        url: `${backendDomain}/create-post`,
        method: "post"
    },
    otpVerify:{
        url: `${backendDomain}/otpverify`,
        method: "post"
    },
    

}

export default backendUrl