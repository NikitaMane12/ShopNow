import { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import "../style/cart.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState("");
  const [pricesummary, setPriceSummary] = useState({
    price: 0,
    dicount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  });

  const { removeFromCart } = useCart();
  const fetch = async () => {
    let userDetail = JSON.parse(localStorage.getItem("user")) || {};
    let userId = userDetail._id;

    const res = await axios.get(
      `https://shopnow-3-gz50.onrender.com/cartRoutes/get/${userId}`
    );
    const data = res.data.data;

    setCart(data);
    let cost = 0;
    data.forEach((item) => {
      cost += item.price * item.quantity;
    });
    console.log("------cost-----", cost);
    const discount = cost * 0.1;
    const tax = cost * 0.1;
    const deliveryCharge = data.length > 0 ? 100 : 0;
    const total = Math.floor(cost + tax + discount + deliveryCharge);
    setPriceSummary({
      price: cost,
      discount,
      tax,
      delivery: deliveryCharge,
      total,
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      let userDetail = JSON.parse(localStorage.getItem("user")) || {};
      //   let userID = userDetail._id;
      if (Object.keys(userDetail).length > 0) {
        const res = await axios.delete(
          `http://localhost:5002/cartRoutes/delete/${productId}`
        );

        const delectddata = res.data;
        console.log("data---36-->", delectddata);

        // let newData = await axios.get(
        //   `http://localhost:5002/cartRoutes/${userID}`
        // );
        // let newdata = newData.data;
        // setCart(newdata);
        if (!delectddata.isError) {
          Swal.fire({
            icon: "success",
            title: "Product Removed",
            text: "The product has been removed from your cart.",
            confirmButtonText: "OK",
          });
          removeFromCart({ productId });
          fetch();
        }
        // setCart(newdata);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Remove",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCheckOut = () => {
    if (pricesummary.total > 100) {
      navigate("/checkout");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add a product first!",
      });
    }
  };
  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Cart Page</h1>
        <div className="row" id="main-container">
          <div className="col-sm-10 details">
            <div className="cart-items">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="cart-card">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="cart-image"
                      height="100px"
                    />

                    <h3>{item.productName}</h3>
                    <p>Price: ₹{item.price}</p>
                    <h6>Quantity:{item.quantity}</h6>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
          <div className="col-sm-3 summary">
            <h3>Summary</h3>
            <ul>
              <li>
                <span>Amount</span>
                <span>₹{pricesummary.price} </span>
              </li>
              <li>
                <span>Tax</span> <span>₹{pricesummary.tax}</span>
              </li>
              <li>
                <span>Delivery</span> <span>₹{pricesummary.delivery}</span>
              </li>
              <li>
                <span>Discount</span> <span>₹{pricesummary.dicount}</span>
              </li>
              <hr />
              <li>
                <span>
                  <h4>Total</h4>
                </span>
                <span>
                  <h4>₹{pricesummary.total}</h4>
                </span>
              </li>
              <button id="CheckoutBtn" onClick={handleCheckOut}>
                Checkout
              </button>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
