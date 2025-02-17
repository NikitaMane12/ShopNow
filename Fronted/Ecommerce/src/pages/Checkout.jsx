import { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
  });

  const [quantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [cart, setCart] = useState([]);

  // Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        let userDetail = JSON.parse(localStorage.getItem("user")) || {};
        let userId = userDetail._id;

        const res = await axios.get(
          `https://shopnow-3-gz50.onrender.com/cartRoutes/get/${userId}`
        );
        setCart(res.data.data);
        let array = res.data.data;
        let totalCost = 0;
        for (let el of array) {
          totalCost += el.price;
        }
        if (totalCost > 0) {
          totalCost += 100;
        }
        setTotalCost(totalCost);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetail = JSON.parse(localStorage.getItem("user")) || {};
    const userId = userDetail._id;

    const orderData = {
      userId,
      customerDetails: formData,
      cartItems: cart, // Selected cart items
      totalAmount: totalCost,
    };

    try {
      const response = await axios.post(
        "http://localhost:5002/order/",
        orderData
      );

      if (response.status === 201) {
        const result = await axios.delete(
          `https://shopnow-3-gz50.onrender.com/cartRoutes/deletemany/${userId}`
        );
        console.log("--result---", result);
        Swal.fire({
          title: "Order Placed!",
          text: "Your order has been successfully placed.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/order"); // Redirect to order page
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to place order. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div id="main" className="container">
        <div className="row">
          {/* Billing Details Section */}
          <div className="col-md-8 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Billing Details</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        <label className="form-label">First Name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        <label className="form-label">Last Name</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">Address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">Phone</label>
                  </div>

                  <div className="form-outline mb-4">
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Make Purchase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-md-4 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{quantity}</span>
                  </li>
                  <hr />
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total Amount</strong>
                      <p className="mb-0">(including VAT)</p>
                    </div>
                    <span>
                      <strong>₹{totalCost}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
