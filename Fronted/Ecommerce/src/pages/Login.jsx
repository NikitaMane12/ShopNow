import { useState } from "react";

import "../style/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { useCart } from "../context/CartContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://shopnow-3-gz50.onrender.com/users/login",
        {
          email,
          password,
        }
      );

      let result = response.data;
      // console.log("response--->", response);
      if (!result.isError) {
        // alert(result.meassge);

        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        fetchCart(result.user._id);
        navigate("/");
      } else {
        Swal.fire({
          title: "Error!",
          text: result.meassge,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      // alert(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Login failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleLogin}>
        <div className="Body-conatainer">
          <div className="Login-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Login;
