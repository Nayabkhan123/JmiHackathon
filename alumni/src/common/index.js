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
    

}

export default backendUrl