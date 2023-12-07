import { useState } from "react";
import { enroll } from "../../api/membership";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default () => {
    const navigate = useNavigate();
    const [_name, setName] = useState<any>('');
    const [_period, setPeriod] = useState<any>('');
    const [phone_no, setPhoneNo] = useState<any>('');
    const [start_dt, setStartDt] = useState<Date>(new Date());
    const edt:Date = new Date();
    edt.setDate(edt.getDate() + 30);
    const [end_dt, setEndDt] = useState<Date>(edt);
    const [payment, setPayment] = useState<any>('');
    const [subscriptions, setSubscriptions] = useState<any>('');
    
    const [remarks, setRemarks] = useState<string>('');

  
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setSubscriptions('[]')
        const response = await enroll({_name, _period, phone_no, start_dt, end_dt, payment, 
          subscriptions, remarks});
        if (response.status == 200) {
          navigate("/memberships");
        }
  };

  const periodChangeHandler = (e:any) => {
    const value = e.target.value;
    setPeriod(value)
    if(value) {
      let month:number = parseInt(value.split(' ')[0])
      let dt:Date = new Date()
      dt.setDate(dt.getDate() + month * 30);
      setEndDt(dt)
    }
  }

  return (
    <div className="container-fluid my-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/enroll">
            Enroll
          </a>
        </li>
      </ul>
      <div className="border border-top-0 p-4">
        <form noValidate onSubmit={handleSubmit} className="needs-validation g-2 row">
          <div className="">
            <label htmlFor="_nameText" className="form-label mb-0 ">
              <span className="bi bi-card-checklist text-primary"></span>
              <span className="ms-2 text-primary">Name</span> 
            </label>
            <input onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" className="form-control p-3 text-light" id="_nameText" />
          </div>
          <div className="mb-2">
            <label htmlFor="phone_noText" className="form-label mb-0">
              <span className="bi bi-telephone-fill text-primary"></span>
              <span className="ms-1 text-primary"> Phone Number</span> 
            </label>
            <input onChange={(e) => setPhoneNo(e.target.value)} type="text" className="form-control p-3 text-light" id="phone_noText" placeholder="Phone Number" />  
          </div>
          <div className="">
            <label htmlFor="floatingSelect"><span className="bi bi-shop text-primary"></span><span className="ms-2 text-primary">Period</span></label>
            <select onChange={periodChangeHandler} className="form-select p-3" id="floatingSelect" aria-label="Floating label select example">
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
                <option value="3 Months">3 Months</option>
                <option value="4 Months">4 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="9 Months">9 Months</option>
                <option value="12 Months">12 Months</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDtText" className="form-label mb-0 ">
              <span className="bi bi-card-checklist text-primary"></span>
              <span className="ms-2 text-primary"> Start Date</span> 
            </label><br/>
            <DatePicker placeholderText="Start Date" className="form-control p-3 text-light" selected={start_dt} onChange={(date:any) => setStartDt(date)} />
          </div>
          <div>
            <label htmlFor="endDtText" className="form-label mb-0 ">
              <span className="bi bi-card-checklist text-primary"></span>
              <span className="ms-2 text-primary"> End Date</span> 
            </label><br/>
            <DatePicker placeholderText="End Date" className="form-control p-3 text-light" selected={end_dt} onChange={(date:any) => setEndDt(date)} />
          </div>
          <div className="">
            <label htmlFor="paymentText" className="form-label mb-0 ">
              <span className="bi bi-card-checklist text-primary"></span>
              <span className="ms-2 text-primary">Payment</span> 
            </label>
            <input onChange={(e) => setPayment(e.target.value)} placeholder="Amount" type="number" className="form-control p-3 text-light" id="paymentText" />
          </div>
          <div className="">
            <label htmlFor="feedbackText" className="form-label mb-0 ">
              <span className="bi bi-card-checklist text-primary"></span>
              <span className="ms-2 text-primary"> Remarks</span> 
            </label>
            <input onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" type="text" className="form-control p-3 text-light" id="feedbackText" />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">Enroll</button>&nbsp;&nbsp;
            <button className="btn btn-danger" type="reset">Cancel</button>
          </div>
        </form>
      </div>
      <div className="col-xs-12" style={{'height' : '13rem'}}></div>
    </div>
  );
};
