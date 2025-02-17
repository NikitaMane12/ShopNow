import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/productDetails.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const [isInCart, setIsInCart] = useState();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { addToCart, removeFromCart } = useCart();
  console.log("location-->", location);
  const product = location.state?.product;

  useEffect(() => {
    const fetch = async () => {
      console.log("product---->", product);
      const res = await axios.get(
        `https://shopnow-3-gz50.onrender.com/cartRoutes/getSpecificProduct/${product._id}`
      );
      const { data: { data = [] } = {} } = res || {};
      console.log("data", data);
      // setCart(data);

      setIsInCart(!!data.length);
    };
    fetch();
  }, []);

  // handlequantity
  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDelte = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  //
  const handleAddCart = async () => {
    let userDetail = JSON.parse(localStorage.getItem("user")) || {};
    console.log("userDetail-->", userDetail);
    if (Object.keys(userDetail).length > 0) {
      if (isInCart) {
        let id = product._id;

        let res = await axios.delete(
          `https://shopnow-3-gz50.onrender.com/cartRoutes/delete/${id}`
        );
        let data = res.data;
        console.log("data--->", data);
        window.dispatchEvent(new Event("cartUpdated"));

        if (!data.isError) {
          setIsInCart(false);
          removeFromCart({ productId: id });
          Swal.fire({
            icon: "success",
            title: "Product Removed",
            text: "The product has been removed from your cart.",
            confirmButtonText: "OK",
          });
        }
      } else {
        console.log("quantity-->", quantity);
        let obj = {
          productId: product._id,
          productName: product.brand,
          productImage: product.image,
          price: product.price,
          quantity: quantity,
          userId: userDetail._id,
          description: product.description,
        };

        let res = await axios.post(
          "https://shopnow-3-gz50.onrender.com/cartRoutes/post",
          obj
        );
        let data = res.data;
        // console.log("data--->", data);
        if (!data.isError) {
          addToCart(obj);
          setIsInCart(true);
          Swal.fire({
            icon: "success",
            title: "Product Added",
            text: data.messge,
            confirmButtonText: "OK",
          });
        } else {
          setIsInCart(false);
          Swal.fire({
            icon: "Error",
            title: "Product Already Exist",
            text: data.messge,
            confirmButtonText: "OK",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please Login First",
        text: "Want to add Product to the card please login!",
        confirmButtonText: "OK",
      });
    }
  };
  if (!product) {
    return (
      <p>No product details available. Please go back and select a product.</p>
    );
  }

  return (
    <>
      <Navbar />
      <div className="Product-details">
        <div className="product-imge">
          <img src={product.image} alt={product.title} height="350px" />
        </div>
        <div className="product-div">
          <h2>{product.brand}</h2>
          <h4 style={{ marginTop: "20px" }}>Price: ${product.price}</h4>
          color:
          <div
            style={{
              background: product.color,
              height: "30px",
              width: "30px",

              borderRadius: "50px",
            }}
          ></div>
          <h6 className="product-h2">category: {product.category}</h6>
          <h6 className="product-h2">{product.description}</h6>
          <button className="btn-add-cart" onClick={handleAdd}>
            +
          </button>
          {/* <p>{quantity}</p> */}
          <span>&nbsp;&nbsp; {quantity}</span>
          <button className="btn-add-cart" onClick={handleDelte}>
            -
          </button>
          <button className="btn-add-cart" onClick={handleAddCart}>
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
