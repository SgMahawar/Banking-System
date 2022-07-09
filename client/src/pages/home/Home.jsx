import React from 'react'

export default function Home() {
  return (
    <div className='home' id='loginform'>
      <h1 id='headerTitle'>Home</h1>
      <div className='form'>
        <div id='button' className='row'>
            <button onClick={()=>window.location='/transactions'}>Banking</button>
        </div>
        <div id='button' className='row'>
          <button onClick={()=>window.location='/emplogin'}>Employee Login</button>
        </div>
        <div id='button' className='row'>
          <button onClick={()=>window.location='/about'}>About Us</button>
      </div>
      
    </div>

    </div>
  )
}
