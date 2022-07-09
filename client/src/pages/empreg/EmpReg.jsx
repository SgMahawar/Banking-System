import React, { useEffect, useState } from 'react';
import './register.css'
import axios from 'axios';


export default function EmpReg() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [bcode,setBcode] = useState(554);
  const [designation, setDesignation] = useState('Accountant');
  const [blist, setBlist] = useState([]);

  useEffect(()=>{
    getList();
  },[]);

  const getList = async ()=>{
    const list = await axios.get("http://localhost:8000/api/blist");
    setBlist(list.data);
  }

  const submit = async ()=>{
    console.log(bcode);
    axios.post("http://localhost:8000/api/empreg",
    {
      "fullName": name,
      "password": password,
      "bcode": bcode,
      "designation": designation
    }).then((res)=>{
      alert("Successful registration!");
      console.log("Successful registration!");
      window.location='/dashboard';
    })
  }

  const branchList = blist.map((branch) => 
    <option value='123'>{branch.branch_name}</option>
  );

  return (
    <div className='register' id='loginform'>
      <h1 id='headerTitle'>Register</h1>
      <div className='form'>
        <div className='row'>
          <label>Name</label>
          <input type={'text'} onChange={(e)=>{
          setName(e.target.value) 
          }}></input>
        </div>
        <div className='row'>
          <label>Password</label>
          <input type={'password'} onChange={(e)=>{
          setPassword(e.target.value)
          }}></input>
        </div>
        <div className='row'>
          <label>Branch</label>
          <select value={bcode} onChange={(e)=>setBcode(e.target.value)}>
            {
              branchList
            }
          </select>
        </div>
        <div className='row'>
          <label>Designation</label>
          <select value={designation} onChange={(e)=>setDesignation(e.target.value)}>
            <option>Accountant</option>
            <option>Manager</option>
            <option>Loan Officer</option>
            <option>Auditor</option>
          </select>
        </div>
        <div id='button' className='row'>
          <button onClick={submit}>Register</button>
        </div>
        
      </div>
    </div>
  )
}
