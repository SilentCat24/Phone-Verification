import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
const navigate=useNavigate();
const [error,setError]=useState("")
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

const handleSubmit = async (e) => {
    e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.phone
  ) {

    setError("All fields are required");
    setTimeout(()=>{
        setError(" ")
    },2000)
  

    return;

  }


    try {
        setError(" ");
      const res = await axios.post(
        "https://phone-verification-ah53.onrender.com/auth/register",
        formData
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
   <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#3943B7",
      minHeight:"95vh"

    }}>
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

        <button type="submit">
          Register
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