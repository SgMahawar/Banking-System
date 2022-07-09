import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

export default function EmpLogin() {

  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [wc,setWc]=useState(false);

  
  const submit = async ()=>{
    setWc(false);
    console.log("button pressed");
    axios.post("http://localhost:8000/api/emplogin",{"username": username, "password": password}).then((res)=>{
      console.log(res.data.length);
      if(res.data.length===0) setWc(true);
      else{
        localStorage.setItem("user",JSON.stringify(res.data));
        window.location='/dashboard';
      }
      console.log("Successful request!");
    })
  }

  return (
    <div className='Login' id='loginform'>
      <h1 id='headerTitle'>Login</h1>
      <div className='form'>
        <div className='row'>
          <label>Employee ID</label>
          <input type={'text'} onChange={(e)=>{
          setUserName(e.target.value) 
          }}></input>
        </div>
        <div className='row'>
          <label>Password</label>
          <input type={'password'} onChange={(e)=>{
          setPassword(e.target.value)
          }}></input>
          {wc && <p>*Wrong credentials</p>}
        </div>
        <div id='button' className='row'>
          <button onClick={submit}>Login</button>
        </div>
        
      </div>
    </div>
  )
}
