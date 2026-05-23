import { useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import useAuth from "../customHooks/Hooks";


const Login = () => {
  const {loginUser,error,loading} = useAuth();
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

  const handleSubmit = (e) => {
  e.preventDefault();
  loginUser(formData);
};



  return (
    <div className="main">
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