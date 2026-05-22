import { useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  const [error,setError]=useState(" ")
    const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = async (e) => {

    e.preventDefault();
      if (

    !formData.email ||
    !formData.password 
   
  ) {

    setError("All fields are required");
    setTimeout(()=>{
        setError(" ")
    },2000)
  

    return;

  }

    try {

      const res = await axios.post(
        "https://phone-verification-ah53.onrender.com/auth/login",
        formData
      );

      // save token
      localStorage.setItem(
        "token",
        res.data.token
      );
      alert("Login Successful");
      navigate("/dashboard");
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
       <h1>Login</h1>
       <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br/>
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br/><br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      <Link to="/" style={{color:"white"}}>
        Create Account
      </Link>

    </div>
  )
}

export default Login