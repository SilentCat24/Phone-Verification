import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://phone-verification-pq9z.onrender.com/auth";

const useAuth = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 2000);
  };

  const registerUser = async (formData) => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      showError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${API_URL}/register`, formData);
         navigate("/login");
      alert(res.data.message);
    } catch (err) {
      showError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (formData) => {
    if (!formData.email || !formData.password) {
      showError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${API_URL}/login`, formData);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      showError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loginUser,
    error,
    loading
  };
};

export default useAuth;