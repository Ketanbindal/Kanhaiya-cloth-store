import React from 'react'
import './Register.css'
import Navbar from '../common/Navbar'
export default function Register() {
  return (
    <>
    
    <div className='LoginArea'>
        <form>
          <span>
            <label name="username">
                username
            </label>
            <input type='text'  className="username" id="username"placeholder='Username'>
            </input>
            </span>
          <span>
            <label >Email</label>
            <input type='text' className='email' name='email' id='email' placeholder='Email'></input>
          </span>  
          <span>  
            <label name="Password">Password</label>
            <input type="text" name="Password" ClassName="Password" id="Password" placeholder="Password">
            </input>
            </span> 

            <button type='submit'>Register</button>
        </form>
    </div>
    
    </>
  )
}
