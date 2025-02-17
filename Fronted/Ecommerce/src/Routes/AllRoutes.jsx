import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Productpage from "../pages/Productpage";
import Womens from "../pages/Womens";
import KidsProduct from "../pages/KidsProduct";
import ProductDetails from "../componets/ProductDetials";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mens" element={<Productpage />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/kidsProduct" element={<KidsProduct />} />

        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </>
  );
};
