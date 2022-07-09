import React, { useEffect, useState } from 'react'
import './about.css'
import axios from 'axios';

export default function About() {

  const [blist, setBlist] = useState([]);
  const [elist, setElist] = useState([]);

  useEffect(()=>{
    getbranches();
    getemployees();
  },[]);

  const getbranches = async()=>{
    const list = await axios.get("http://localhost:8000/api/blist");
    setBlist(list.data);
  }

  const getemployees = async()=>{
    const list = await axios.get("http://localhost:8000/api/elist");
    setElist(list.data);
  }

  const branchList = blist.map((branch)=>
    <div className='bdetails'>
      <p>Branch Name: {branch.branch_name}</p>
      <p>Branch Code: {branch.branch_code}</p>
      <p>Branch Address: {branch.branch_add}</p>
    </div>
  );

  const employeeList = elist.map((emp)=>
    <div className="bdetails">
      <p>Name: {emp.emp_name}</p>
      <p>Designation: {emp.designation}</p>
      <p>Branch Name: {emp.branch_name}</p>
      <p>Branch Address: {emp.branch_add}</p>
    </div>
  );

  return (
    <div className='about'>
      <h1>About Us</h1>
      <div className='roww'>
        <div className="col">
          <h3>Our Branches</h3>
          {branchList}
        </div>
        <div className="col">
          <h3>Our Employees</h3>
          {employeeList}
        </div>
      </div>
      
    </div>
  )
}
