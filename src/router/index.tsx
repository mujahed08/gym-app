import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import Enroll from "../views/enroll";
import Memberships from "../views/memberships";
import Remove from "../views/memberships/remove";
import View from "../views/memberships/view";
import Edit from "../views/memberships/edit";


const router = createBrowserRouter([
    
    {
        path: "/login",
        element: <Login />,
    }, {
        path: "/",
        element: <Home />,
        children: [{
            path: "/enroll",
            element: <Enroll />
        }, {
            path: "/memberships",
            element: <Memberships />
        }, {
            path: "/membership/remove/:id",
            element: <Remove />
        }, {
            path: "/membership/view/:id",
            element: <View />
        }, {
            path: "/membership/edit/:id",
            element: <Edit />
        }]
    }
]);

export default router