import { useCallback, useEffect, useState } from "react";

import "../style/product.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";

const KidsProduct = () => {
  const navigate = useNavigate();
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",

    "Grey",
    "Pink",
  ];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://shopnow-3-gz50.onrender.com/kidproduct/getAll"
        );
        const data = await res.json();
        setProducts(data);
        console.log(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  //  function search product
  const handleSearch = useCallback(
    (brand) => {
      console.log("query--->", brand);
      if (!brand) {
        setFilteredProducts(products);
        return;
      }

      const fetchData = async () => {
        try {
          const res = await axios.post(
            "https://shopnow-3-gz50.onrender.com//kidproduct/",
            {
              brand,
            }
          );
          const data = res.data;
          console.log("data-------123----------->", data);
          console.log(data);
          setFilteredProducts(data);
        } catch (error) {
          console.log("Data fetching error:", error);
        }
      };
      fetchData();
    },

    [products]
  );

  // function of color filter
  const handleColorFilter = async (color) => {
    console.log("---color---", color);
    try {
      const res = await axios.post(
        "https://shopnow-3-gz50.onrender.com//kidproduct",
        {
          color,
        }
      );
      console.log("-----res----", res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.log("data fetching errro", error);
    }
  };

  // Function to handle sorting
  const handleSort = (order) => {
    console.log("order--->", order);
    // setSortOrder(order);
    // let sortedProducts = [...products];

    // if (order === "lowToHigh") {
    //   sortedProducts.sort((a, b) => a.price - b.price);
    // } else if (order === "highToLow") {
    //   sortedProducts.sort((a, b) => b.price - a.price);
    // }
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://shopnow-3-gz50.onrender.com/kidproduct/",
          {
            order,
          }
        );
        const data = res.data;
        console.log("data-------123----------->", data);
        console.log(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log("Data fetching error:", error);
      }
    };
    fetchData();

    // setFilteredProducts(sortedProducts);
  };

  const handleBrandChange = async (e) => {
    const { value, checked, name } = e.target;
    console.log("---e.target", e.target);
    console.log("check name value----", name);
    if (name == "brand") {
      if (checked) {
        const fetchdata = async () => {
          try {
            let brand = value;
            const res = await axios.post(
              "https://shopnow-3-gz50.onrender.com/kidproduct/",
              {
                brand,
              }
            );
            const data = res.data;

            console.log(data);
            setFilteredProducts(data);
          } catch (error) {
            console.log("fetch ing error", error);
          }
        };
        fetchdata();
      }
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="Product-container">
        <div className="first-contain">
          <div>
            <h3 className="Filters3">Filters</h3>
            <h4 className="Filters4"> Brands</h4>
            <div className="brand">
              <div>
                <input
                  type="checkbox"
                  value="Trendy Boys"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Trendy Boys</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Trendy Girl"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Trendy Girl</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Cute Comfy Frocks "
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Cute Comfy Frocks </label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="colorH4"> Color</h4>
            <div className="color-container">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="colordiv"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorFilter(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="second-contain">
          {/* Sorting Buttons */}
          <div className="filter_Button">
            <button>SortBy</button>
            <button onClick={() => handleSort("asc")}>Low to High</button>
            <button onClick={() => handleSort("desc")}>High to Low</button>
          </div>

          <div className="product-list">
            {filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() =>
                  navigate(`/productDetails/${product.id}`, {
                    state: { product },
                  })
                }
              >
                <img src={product.image} alt={product.title} />
                <h6>{product.brand}</h6>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default KidsProduct;
