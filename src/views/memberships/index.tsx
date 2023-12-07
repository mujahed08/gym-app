import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMemberships } from "../../api/membership";

export default () => {

  const [tab, setTab] = useState<number>(0);
  const [memberships, setMemberships] = useState<any>([]);
  
  const fetchData = async (status:string) => {
    try {
      const data = await getMemberships(status);
      setMemberships(data?.data?.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    if(tab == 0 ) {
      fetchData("New");
    } else if(tab == 1) {
      fetchData("Done");
    }
    setMemberships([])
  }, [tab]);


  const formatDateTime = (datetime:any) => {
    let date = new Date(datetime);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  /* const formatDate = (datetime:any) => {
    let date = new Date(datetime);
    return date.toLocaleDateString()
  } */

  return (
    <div className="container-fluid my-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button onClick={()=>setTab(0)} className={`nav-link ${tab == 0 ? "active" : ""}`}>Active</button>
        </li>
        {/* <li className="nav-item">
          <button onClick={()=>setTab(1)} className={`nav-link ${tab == 1 ? "active" : ""}`}>Expired</button>
        </li> */}
      </ul>

      <div className="py-2 d-flex flex-wrap" style={{ overflow: "auto" }}>
        {memberships.map( (membership:any) => <div className="card col-12 col-lg-3 my-2 m-lg-2 ">
            <div className="card-body d-flex flex-wrap">
                <div className="col-2">
                    <h5 className="card-title">#{membership.id}</h5>
                </div>
                <div className="col-10">
                    <h5 className="card-title">{membership._name}</h5>
                    <h6 className="card-subtitle text-body-secondary">
                        <span>{formatDateTime(membership?.created_on)}</span>
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
                    <Link className="icon-link icon-link-hover" to={`/membership/remove/${membership.id}`}>
                        <span className="bi bi-trash text-danger"></span>
                    </Link>
                    <Link className="icon-link icon-link-hover" to={`/membership/view/${membership.id}`}>
                        more...<span className="bi bi-arrow-right text-primary"></span>
                    </Link>
                </div>
            </div>
            
        </div>)}
      </div>
    </div>
  );
};
