import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMembership } from "../../api/membership";



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

    const formatDate = (datetime:any) => {
        let date = new Date(datetime);
        return date.toLocaleDateString()
    }

    return <div className="container-fluid">
        <a onClick={() => navigate(-1)} className="mt-2 px-2 fs-4 fw-bold icon-link icon-link-hover" >
            <span className="bi bi-arrow-left text-primary"></span>
        </a>
        {membership ? <div className="card col-12 col-lg-3 my-2 ">
            <div className="card-body d-flex flex-wrap">
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
                        <span className="bi bi-body-text text-primary"></span>
                    <span className="ms-2 text-primary">Remarks</span> </label>
                    <p>
                        <strong>{membership.remarks}</strong>
                    </p>
                </div>

                <div className="col-4 mt-2">
                    <label htmlFor="start_dt">
                        <span className="bi bi-calendar-date text-primary"></span>
                    <span className="ms-2 text-primary">Start Date</span> </label>
                    <p>
                        <strong>{formatDate(membership.start_dt)}</strong>
                    </p>
                </div>
                <div className="col-4 mt-2">
                    <label htmlFor="end_dt">
                        <span className="bi bi-calendar-date text-primary"></span>
                    <span className="ms-2 text-primary">End Date</span> </label>
                    <p>
                        <strong>{formatDate(membership.end_dt)}</strong>
                    </p>
                </div>

                <div className="col-4 mt-2">
                    <label htmlFor="_period">
                        <span className="bi bi-calendar-week text-primary"></span>
                    <span className="ms-2 text-primary">Period</span> </label>
                    <p>
                        <strong>{membership._period}</strong>
                    </p>
                </div>
                <div className="col-5 mt-2">
                    <label htmlFor="payment">
                        <span className="bi bi-currency-rupee text-primary"></span>
                    <span className="ms-2 text-primary">Payment</span> </label>
                    <p>
                        <strong>{membership.payment}</strong>
                    </p>
                </div>
                <div className="col-5 mt-2">
                    <label htmlFor="manage_by">
                        <span className="bi bi-person text-primary"></span>
                    <span className="ms-2 text-primary">Manage By</span> </label>
                    <p>
                        <strong>{membership.login_username}</strong>
                    </p>
                </div>

                <div className="col-12 mt-2 d-flex">
                    <Link className="icon-link icon-link-hover" to={`/membership/remove/${membership.id}`}>
                        <span className="bi bi-trash text-danger"></span>
                    </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link className="icon-link icon-link-hover" to={`/membership/edit/${membership.id}`}>
                        <span className="bi bi-pencil text-success"></span>
                    </Link>
                </div>
            </div>
            
        </div> : ''}
    </div>
}