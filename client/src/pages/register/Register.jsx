import React, { useEffect, useState } from 'react';
import './register.css'
import axios from 'axios';


export default function Register() {

  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('Savings Account');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [add, setAdd] = useState('');
  const [bcode,setBcode] = useState(0);
  const [pin, setPin] =useState(0);
  const [balance, setBalance] = useState(0);
  const [blist, setBlist] = useState([]);

  useEffect(()=>{
    getList();
  },[]);

  const getList = async ()=>{
    const list = await axios.get("http://localhost:8000/api/blist");
    setBlist(list.data);
  }

  const submit = async ()=>{
    console.log(gender);
    console.log(bcode);
    console.log(dob);
    axios.post("http://localhost:8000/api/register",
    {
      "fullName": name,
      "username": username,
      "password": password,
      "gender": gender,
      "acc_type": type,
      "dob": dob,
      "mobile": mobile,
      "bcode": bcode,
      "pin":pin,
      "address": add
    }).then(()=>{
      alert("Successful Registration");
      console.log("Successful registration!");
      window.location='/dashboard';
    })
  }

  const branchList = blist.map((branch) => 
    <option value={branch.branch_code}>{branch.branch_name}</option>
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
          <label>Username</label>
          <input type={'text'} onChange={(e)=>{
          setUserName(e.target.value) 
          }}></input>
        </div>
        <div className='row'>
          <label>Password</label>
          <input type={'password'} onChange={(e)=>{
          setPassword(e.target.value)
          }}></input>
        </div>
        <div className='row'>
          <label>4 digit pin</label>
          <input type={'password'} onChange={(e)=>{
          setPin(e.target.value)
          }}></input>
        </div>
        <div className='row'>
          <select value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>
        <div className='row'>
          <select value={type} onChange={(e)=>setType(e.target.value)}>
            <option>Savings Account</option>
            <option>Current Account</option>
            <option>Loan Account</option>
          </select>
        </div>
        <div className='row'>
          <select value={bcode} onChange={(e)=>setBcode(e.target.value)}>
            {
              branchList
            }
          </select>
        </div>
        <div className='row'>
          <label>Mobile Number</label>
          <input type={'number'} onChange={(e)=>{
          setMobile(e.target.value)
          }}></input>
        </div>
        <div className='row'>
          <label>Date of Birth</label>
          <input type={'date'} onChange={(e)=>{
          setDob(e.target.value)
          }}></input>
        </div>
        <div className='row'>
          <label>Address</label>
          <input type={'text'} onChange={(e)=>{
          setAdd(e.target.value)
          }}></input>
        </div>
        <div id='button' className='row'>
          <button onClick={submit}>Register</button>
        </div>
        
      </div>
    </div>
  )
}
