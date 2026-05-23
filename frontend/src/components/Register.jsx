import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../customHooks/Hooks';
import '../components/Styles.css'



const Register = () => {
const {registerUser,error,loading} = useAuth();

const[formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    phone:""
})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  registerUser(formData);
};



  return (
   <div className='main'>
        {
  error && (
    <p style={{color:"white"}}> {error}</p>
  )
}
 <h1 style={{color:"white"}}>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          onChange={handleChange}
        />

        <br /><br />

         <button disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      </form>

      <br />

      <Link to="/login" style={{color:"white"}}>
        Already have account? Login
      </Link>


    </div>
  )
}

export default Register