import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import "../style/register.css";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://shopnow-3-gz50.onrender.com/users/register",
        {
          firstname,
          lastname,
          email,
          password,
        }
      );
      let result = response.data;
      console.log("response--->", response);
      if (!result.isError) {
        // alert(result.meassge);
        Swal.fire({
          title: "Success!",
          text: result.meassge,
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/login");
      } else {
        // alert(result.meassge);
        Swal.fire({
          title: "Error!",
          text: "Registration failed",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      // alert(error.meassge);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.meassge || "Registration failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <form onSubmit={handleSignup}>
          <div className="Body-container1">
            <div className="register-container">
              <label>First Name:</label>
              <input
                type="text"
                placeholder="Enter your first name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Enter your last name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Register</button>
              <p className="login-prompt">
                Already have an account?{" "}
                <span className="login-link" onClick={() => navigate("/login")}>
                  Login here
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
