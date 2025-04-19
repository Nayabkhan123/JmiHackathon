import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { AlumniDirectory } from "../Pages/AlumniDirectory";
import PostForm from "../Pages/PostForm";
import EditProfile from "../Pages/EditProfile";

const router =createBrowserRouter([
    {
       path: "/",
       element: <App/>,
       children: [
        {
            path:"",
            element: <Home/>
        },
        {
            path:"login",
            element: <Login/>
        },
        {
            path:"register",
            element: <Register/>
        },
        {
            path:"alumni-directory",
            element: <AlumniDirectory/>
        },
        {
            path:"postForm",
            element: <PostForm/>
        },
        {
            path:"edit-profile",
            element: <EditProfile/>
        },
        
       ] 
    }
])

export default router