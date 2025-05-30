// const backendDomain = "http://localhost:8000/api";
// const backendDomain = `${process.env.BACKEND_URL}/api`
const backendDomain = "https://alumni-connect-backend-seven.vercel.app/api"

console.log("first",process.env.BACKEND_URL)
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
    
    otpVerify:{
        url: `${backendDomain}/otpverify`,
        method: "post"
    },
    allposts:{
        url: `${backendDomain}/all-posts`,
        method: "get"
    },
    createPost:{
        url: `${backendDomain}/create-post`,
        method: "post"
    },
    deletePost:{
        url: `${backendDomain}/delete-post`,
        method: "delete"
    },
    editPost:{
        url: `${backendDomain}/edit-post`,
        method: "put"
    },
    editPost:{
        url: `${backendDomain}/edit-post`,
        method: "put"
    },
    

    
    
    

}

export default backendUrl