import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { AlumniDirectory } from "../Pages/AlumniDirectory";

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
       ] 
    }
])

export default router