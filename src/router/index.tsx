import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";


const router = createBrowserRouter([
    
    {
        path: "/login",
        element: <Login />,
    }, {
        path: "/",
        element: <Home />,
    }
]);

export default router