import React from 'react'
import './navbar.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='links'>
        <a href='/'>Home</a>
      </div>
      <div className='links'>
        <a href='/transactions'>Banking</a>
      </div>
      <div className='links'>
        <a href='/emplogin'>Employee Login</a>
      </div>
      <div className='links'>
        <a href='/about'>About</a>
      </div>
    </div>
  )
}
