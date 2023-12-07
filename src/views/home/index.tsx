import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

export default () => {

    const navigate = useNavigate()
    const str:any = localStorage.getItem("user");
    const timestamp = localStorage.getItem('timestamp')

    if( null == str ) {
        navigate('/login')
    } else if(null != timestamp){
        const t1 = parseInt(timestamp)/1000;
        const t2 = Date.now()/1000;
        const duration = t2 - t1;
        if(duration > 3600) {
            navigate('/login')
        }
    } else {
        navigate('/lead')
    }

    return <>
        <Navbar />
        <Outlet/>  
    </>
}