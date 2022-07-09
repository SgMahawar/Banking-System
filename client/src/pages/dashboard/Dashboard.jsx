import React, { useEffect, useState } from 'react'
import './dashboard.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  const [clist, setClist] = useState([]);

  useEffect(()=>{
    getcustomers();
    // console.log(JSON.parse(localStorage.getItem('user'))[0].designation);
  },[]);

  const getcustomers = async()=>{
    const bcode=JSON.parse(localStorage.getItem("user")).br_code;
    const list = await axios.get('http://localhost:8000/api/clist');
    setClist(list.data);
  }

  const customerList=clist.map((e)=>
    <div className='bdetails'>
      <p>Name: <a href='./{e.acc_no}'>{e.name}</a></p>
      <p>Account No: {e.acc_no}</p>
    </div>
  );

  var mg=false;
  if(JSON.parse(localStorage.getItem('user'))[0].designation==='Manager') mg=true;

  return (
    <div className='dashboard'>
      <h1 className='hh'>Dashboard</h1>
      <div className='roww'>
        <div className="col">
          <h3>Customer List</h3>
          {customerList}
        </div>
        <div className="col">
          <h3>Management</h3>
          {/* {employeeList} */}
          <div className='row'>
            <button onClick={()=>window.location='/register'}>Add Customer</button>
            {mg && <button onClick={()=>window.location='/empreg'}>Add Employee</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
