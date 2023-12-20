import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMembership } from "../../api/membership";

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [membership, setMembership] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getOne(parseInt(id));
    }
  }, []);

  const getOne = async (id: number) => {
    try {
      const response = await getMembership(id);
      setMembership(response?.data);
    } catch (error) {
      console.error("Error fetching membership:", error);
    }
  };

  const formatDate = (datetime: any) => {
    let date = new Date(datetime);
    return date.toLocaleDateString();
  };
  // console.log("membershipdata", membership);

  const expiredDate = (endDate: any) => {
    const startDt = new Date();
    const endDt = new Date(endDate);
    const diffrencTime = endDt.getTime() - startDt.getTime();
    const diffrencDays = Math.round(diffrencTime / (1000 * 3600 * 24));
    let expireText = "";
    let expireClass;
    // console.log(diffrencDays > 15);

    if (diffrencDays > 15) {
      expireText = `Membership will expire in ${diffrencDays} days`;
      expireClass = "text-success";
    } else if (diffrencDays > 7) {
      expireText = `Membership will expire in ${diffrencDays} days`;
      expireClass = "text-warning";
    } else if (diffrencDays > 3) {
      expireText = `Membership will expire in ${diffrencDays} days`;
      expireClass = "text-danger";
    }

    return { expireText, expireClass };
  };

  return (
    <div className="container-fluid">
      <a
        onClick={() => navigate(-1)}
        className="mt-2 px-2 fs-4 fw-bold icon-link icon-link-hover"
      >
        <span className="bi bi-arrow-left text-primary"></span>
      </a>
      {membership ? (
        <div className="card col-12 col-lg-3 my-2 ">
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
            <div className="col-12 mt-2">
              <label htmlFor="_period">
                <span className="bi bi-calendar-week text-primary"></span>
                <span className="ms-2 text-primary">Expired on</span>{" "}
              </label>
              <p>
                <strong className={`${expiredDate(membership.end_dt).expireClass}`}>
                  {expiredDate(membership.end_dt).expireText}
                </strong>
              </p>
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="phone_no">
                <span className="bi bi-telephone-fill text-primary"></span>
                <span className="ms-2 text-primary">Contact</span>{" "}
              </label>
              <p>
                <strong>{membership.phone_no}</strong>
              </p>
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="phone_no">
                <span className="bi bi-body-text text-primary"></span>
                <span className="ms-2 text-primary">Remarks</span>{" "}
              </label>
              <p>
                <strong>{membership.remarks}</strong>
              </p>
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="start_dt" className="d-flex">
                <span className="bi bi-calendar-date text-primary me-2"></span>
                <p className="m-0 text-primary fs-6">Start Date</p>{" "}
              </label>
              <p>
                <strong>{formatDate(membership.start_dt)}</strong>
              </p>
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="end_dt" className="d-flex">
                <span className="bi bi-calendar-date text-primary me-2"></span>
                <p className="m-0 text-primary">End Date</p>{" "}
              </label>
              <p>
                <strong>{formatDate(membership.end_dt)}</strong>
              </p>
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="_period" className="d-flex">
                <span className="bi bi-calendar-week text-primary me-2"></span>
                <p className="m-0 text-primary">Period</p>{" "}
              </label>
              <p>
                <strong>{membership._period}</strong>
              </p>
            </div>

            <div className="col-5 mt-2">
              <label htmlFor="payment">
                <span className="bi bi-currency-rupee text-primary"></span>
                <span className="ms-2 text-primary">Payment</span>{" "}
              </label>
              <p>
                <strong>{membership.payment}</strong>
              </p>
            </div>
            <div className="col-12 mt-2">
              <label htmlFor="manage_by">
                <span className="bi bi-person text-primary"></span>
                <span className="ms-2 text-primary">Manage By</span>{" "}
              </label>
              <p>
                <strong>{membership.login_username}</strong>
              </p>
            </div>

            <div className="col-6  d-flex">
              <Link
                className="icon-link icon-link-hover"
                to={`/membership/remove/${membership.id}`}
              >
                <span className="bi bi-trash-fill text-danger fs-5"></span>
              </Link>{" "}
              </div>
              <div className="col-6 d-flex">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                className="icon-link icon-link-hover"
                to={`/membership/edit/${membership.id}`}
              >
                <span className="bi bi-pencil-fill text-success fs-5"></span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
