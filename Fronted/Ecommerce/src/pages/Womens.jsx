import { useCallback, useEffect, useState } from "react";

import "../style/product.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";

const Womens = () => {
  const navigate = useNavigate();
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Grey",
    "Black",
  ];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://shopnow-3-gz50.onrender.com/womensproduct/getAll"
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

  // filter on brand
  const handleBrandChange = async (e) => {
    const { value, checked, name } = e.target;
    console.log(" e.target-->", e.target);
    console.log("value, checked-->", value, checked, name);
    if (name == "brand") {
      if (checked) {
        const fetchData = async () => {
          try {
            let brand = value;
            const res = await axios.post(
              "https://shopnow-3-gz50.onrender.com/womensproduct/",
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
      }
    }
  };

  // color filter

  const handleColorFilter = async (color) => {
    console.log("color-->", color);
    try {
      const res = await axios.post(
        "https://shopnow-3-gz50.onrender.com/womensproduct/",
        {
          color,
        }
      );
      console.log("res---->", res);
      setFilteredProducts(res.data); // Update the product list
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };
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
            "https://shopnow-3-gz50.onrender.com/womensproduct/",
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

  // Function to handle sorting
  const handleSort = async (order) => {
    try {
      const res = await axios.post(
        "https://shopnow-3-gz50.onrender.com/womensproduct/",
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
                  value="Classy Tops"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Classy Tops</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Pretty Dresses"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Pretty Dresses</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Anarkali Kurti"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Anarkali Kurti</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Modern Dresses"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Modern Dresses</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Banarasi Sarees"
                  name="brand"
                  onChange={handleBrandChange}
                />
                <label>Banarasi Sarees</label>
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

export default Womens;
