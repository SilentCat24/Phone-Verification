import axios from 'axios'
import React, { useState } from 'react'
import { jwtDecode } from "jwt-decode";



const DashBoard = () => {

const [otp,setOtp]=useState("");
const [verified,setVerified]=useState(false)

const token=localStorage.getItem("token");
const decoded = jwtDecode(token);

const phone=decoded.phone


const sendOtp=async()=>{

try{
  const res=await axios.post(
    'https://phone-verification-pq9z.onrender.com/otp/send',
    {
      phone
    },
    
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );
  alert(res.data.message)
  // console.log("phone",Phone)
}catch(err){
  console.log(err)
}
}

const verifyOtp=async()=>{
  try{
    const res=await axios.post(
      'https://phone-verification-pq9z.onrender.com/otp/verify',
      {
        phone,otp
      },
      {
        headers:{
           Authorization: `Bearer ${token}`
        }
      }
    );
    alert(res.data.message);
    setVerified(true);
  }catch(err){
    console.log("err",err)
  }
}

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#3943B7",
      minHeight:"95vh"
    }}>
    
   <h1 style={{color:"white"}}>Dashboard</h1>

      <input
        readOnly
        placeholder="Enter Phone Number"
        value={phone}
     
      />

      <br /><br />

      <button onClick={sendOtp}>
        Send OTP
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
      />

      <br /><br />

      <button onClick={verifyOtp}>
        Verify OTP
      </button>

      <br /><br />

      {
        verified && (
          <h2 style={{color:"white"}}>
            User Verified 
          </h2>
        )
      }


    </div>
  )
}

export default DashBoard