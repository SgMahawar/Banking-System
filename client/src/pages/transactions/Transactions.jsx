import React, { useState } from 'react';
import axios from 'axios';

export default function Transactions() {

  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState(0);
  const [type, setType] = useState("Deposit");
  const [showAc, setShowAc] = useState(false);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(0);
  const [wp, setWp] = useState(false);
  const [ib, setIb] =useState(false);
  const [ms, setMs] = useState(false);
  const [msList, setMsList] =useState([]);
  const [bal, setBal] = useState(0);

  const submit = async ()=>{
    setWp(false);
    setIb(false);
    console.log(showAc);
    axios.post("http://localhost:8000/api/transaction",{
      "sender": sender,
      "type": type,
      "amount": amount,
      "receiver": receiver,
      "pin": pin
    }).then((res)=>{
      console.log(res.data);
      if(res.data==='Wrong Pin') setWp(true);
      else if(res.data==='Insufficient Bal') setIb(true);
      else {
        console.log("Transaction Successful!");
        alert("Transaction Successful!")}
    });
  }

  const mstmt=async ()=>{
    // submit();
    if(!wp&&!ib){
      await axios.post('http://localhost:8000/api/bal',{
        'acc_no': sender
      }).then((res)=>{
        setBal(res.data[0].balance);
      })
      await axios.post('http://localhost:8000/api/tlist',{
        "acc_no": sender
      }).then((res)=>{
        setMs(true);
        setMsList(res.data);
      });
    }
  }

  const tlist=msList.map((t)=>
    <div className='tdetail'>
      <p>Date: {t.t_date.substring(0,10)}</p>
      <p>Transaction No: {t.t_id}</p>
      <p>Amount: {t.amount}</p>
      <p>Transaction type: {t.t_type}</p>
    </div>
  );

  return (
    <div className='trasactions' id='loginform'>
      <h1 id='headerTitle'>Banking</h1>
      <div className='form'>
        <div className='row'>
          <label className='label1'>Account No</label>
          <input type={'text'} value={sender} onChange={(e)=>{
            setSender(e.target.value) 
          }}></input>
        </div>
        <div className='row select' id='ss'>
          <select value={type} onChange={(e)=>{
              setType(e.target.value)
              if(e.target.value==='Transfer') setShowAc(true);
              else setShowAc(false);
              }}>
            <option>Deposit</option>
            <option>Withdraw</option>
            <option>Transfer</option>
          </select>
        </div>
        <div className='row'>
          <label className='label1'>Amount</label>
          <input type={'text'} onChange={(e)=>{
          setAmount(e.target.value) 
          }}></input>
          {ib && <p>*Insufficient Balance</p>}
        </div>
        {
          showAc &&
          <div className='row'>
            <label className='label1'>Receiver's Account No</label>
            <input type={'text'} onChange={(e)=>{
              setReceiver(e.target.value) 
          }}></input>
        </div>
        }
        <div className='row'>
          <label className='label1' id='lbl'>Pin</label>
          <input type={'password'} onChange={(e)=>{
          setPin(e.target.value)
          }}></input>
          {wp && <p className='error'>*Wrong Pin</p>}
        </div>
        <div id='button' className='row'>
          <button onClick={submit}>Submit</button>
        </div>
        <div id='button' className='row'>
          <button id='btn' onClick={mstmt}>Account Statement</button>
        </div>
        {
          ms && 
          <div className='row'>
            <h3>Statement</h3>
            <p>Balance: {bal}</p>
            {tlist}
          </div>
        }
        
      </div>
    </div>
  )
}
