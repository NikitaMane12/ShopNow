import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../style/navbar.css";
import { useCart } from "../context/CartContext";
// import axios from "axios";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const { cart = [], resetCart } = useCart();

  console.log("----cart----", cart);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
    if (Object.keys(loggedInUser).length) {
      setUser(loggedInUser);
    }
  }, []);

  // const handleCount = async () => {
  //   try {
  //     const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  //     if (Object.keys(loggedInUser).length) {
  //       let res = await axios.get(
  //         `http://localhost:5002/cartRoutes/${loggedInUser._id}`
  //       );
  //       console.log("Cart Response:", res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart count:", error);
  //   }
  // };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    resetCart();
    navigate("/register");
  };

  // Debounced search functionality
  useEffect(() => {
    if (!searchTerm.trim()) return; // Prevent running with empty input

    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/435/710/non_2x/shop-now-square-sticker-on-white-banner-shop-now-symbol-on-square-frame-special-offer-sign-retail-advertising-shop-now-badge-shape-vector.jpg"
            height="80"
            width="100"
            alt="Shop Now Logo"
          />
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse custom-collapse"
          id="navbarSupportedContent"
        >
          {/* Category Links */}
          <ul className="navbar-nav me-auto" id="ullist1">
            <li className="nav-item">
              <Link className="nav-link" to="/mens">
                Mens
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/womens">
                Womens
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kidsProduct">
                Kids
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex" role="search" id="ullist">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* User Authentication Options */}
          <ul className="navbar-nav" id="ullist3">
            {user ? (
              <>
                {/* Logged-in User Profile */}
                <li className="nav-item text-center">
                  <Link className="nav-link" to="/register">
                    <i className="fa fa-user"></i>
                    <p>{user.firstname}</p>
                  </Link>
                </li>

                {/* Logout Button */}
                <li className="nav-item text-center">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    <i className="fa fa-sign-out"></i>
                    <p>Logout</p>
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Register */}
                <li className="nav-item text-center">
                  <Link className="nav-link" to="/register">
                    <i className="fa fa-user-plus"></i>
                    <p>Register</p>
                  </Link>
                </li>
              </>
            )}

            {/* Shopping Bag */}
            <li className="nav-item text-center">
              <Link className="nav-link" to="/cart">
                <i className="fa fa-shopping-bag"></i>
                {cart.length}
                <p>Bag</p>
              </Link>
            </li>

            {/* Orders */}
            <li className="nav-item text-center">
              <Link className="nav-link" to="/order">
                <i className="fa fa-cart-plus fa-xs"></i>
                <p>Orders</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
