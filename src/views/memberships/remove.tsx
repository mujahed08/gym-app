import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMembership, removeMembership } from "../../api/membership";



export default () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [membership, setMembership] = useState<any>(null);

    useEffect(()=> {
        if(id) {
            getOne(parseInt(id))
        }
        
    }, [])

    const getOne = async (id:number) => {
        try {
            const response = await getMembership(id);
            setMembership(response?.data);
        } catch (error) {
            console.error("Error fetching membership:", error);
        }
    }

    const removeOne = async (id:number) => {
        try {
            const response = await removeMembership(id);
            setMembership(response.data);
            navigate(`/memberships`)
        } catch (error) {
            console.error("Error fetching lead:", error);
        }
    }

    const formatDate = (datetime:any) => {
        let date = new Date(datetime);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }

    return <div className="container-fluid">
        
        {membership ? <div className="card col-12 col-lg-3 my-2 ">
            <div className="card-body d-flex flex-wrap">
                <div className="alert alert-danger col-12" role="alert">
                    <p>Are you sure want to delete this!</p>
                    <button onClick={() => removeOne(membership.id)} className="btn btn-sm btn-danger">Yes</button> &nbsp;&nbsp;
                    <button onClick={() => navigate(-1)} className="btn btn-sm btn-success">No</button>
                </div>
                <div className="col-2">
                    <h5 className="card-title">#{membership.id}</h5>
                </div>
                <div className="col-10">
                    <h5 className="card-title">{membership._name}</h5>
                    <h6 className="card-subtitle text-body-secondary">
                        <span>{formatDate(membership?.created_on)}</span>
                    </h6>
                </div>
                <div className="col-5 mt-2">
                    <label htmlFor="phone_no">
                        <span className="bi bi-telephone-fill text-primary"></span>
                    <span className="ms-2 text-primary">Contact</span> </label>
                    <p>
                        <strong>{membership.phone_no}</strong>
                    </p>
                </div>
                <div className="col-7 mt-2">
                    <label htmlFor="phone_no">
                        <span className="bi bi-telephone-fill text-primary"></span>
                    <span className="ms-2 text-primary">Remarks</span> </label>
                    <p>
                        <strong>{membership.remarks}</strong>
                    </p>
                </div>
                <div className="col-12 mt-2 d-flex justify-content-between">
                    <Link className="icon-link icon-link-hover" to={`/membership/edit/${membership.id}`}>
                        <span className="bi bi-pencil text-success"></span>
                    </Link>
                    <Link className="icon-link icon-link-hover" to={`/membership/view/${membership.id}`}>
                        more...<span className="bi bi-arrow-right text-primary"></span>
                    </Link>
                </div>
            </div>
            
        </div> : ''}
    </div>
}