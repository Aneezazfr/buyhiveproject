import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import "./SearchCategory.css";
import axios from "axios";
import { ICategories } from "../Types/Categories";
import AuthContext from "../context/productContext";
// import { createUniqueName } from "typescript";
import "../App.css";
import FilterContext from "../context/FilterContext";

const SearchCategory = () => {
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    MOQ,
    setMOQ,
    stock_available,
    setStockAvailable,
    selectedCategories,
    setSelectedCategories,
    selectedStock,
    setSelectedStock,
    selectCategory,
    setSelectCategory,
    subCategory,
    setSubCategory,
    query,
    setQuery,
  } = useContext(FilterContext);
  let arr;
  const [subCategories, setSubCategories] = useState<any>([]);
  const [parentCategories, setParentCategories] = useState<any>([]);

  const authCxt = useContext(AuthContext);

  const [searchValue, setSearchValue] = useState("");

  const [modal, setModal] = useState<boolean>(false);
  const modalhandler = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getCategories();
  }, [selectCategory, query]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/categories`
      );
      const data = response.data;
      setSubCategories(data.s_Category);
      setParentCategories(data.parent_categories);
      // getProducts();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="px-4 py-3 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#f3f4f6", borderRadius: "0.45rem" }}
      >
        <div>
          <button
            className="square rounded-pill border-0 bg-transparent d-flex justify-content-center align-items-center hide-category-btn"
            onClick={modalhandler}
          >
            <img
              className="me-2"
              width="30"
              height="30"
              src="https://img.icons8.com/material-outlined/24/0096FF/four-squares.png"
            />
            <span className="">Categories</span>
          </button>
        </div>
        <div
          className="bg-white border-0 py-2 px-3 d-flex justify-content-between align-items-center"
          style={{ borderRadius: "35px", width: "75%" }}
        >
          <input
            type="text"
            name="name"
            className="border-0 searchBar"
            placeholder="What are you looking for?"
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <div className="vr hide-category-dropdown"></div>
          <select
            className="border-0 bg-white selectCategory text-muted select-arrow hide-category-dropdown"
            id="category"
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {parentCategories.map((sCategory: any) => (
              <option value={sCategory}>{sCategory}</option>
            ))}
          </select>
        </div>
        <div>
          <Button
            className="text-center square rounded-pill px-4 d-flex justify-content-center align-items-center "
            onClick={(e) => {
              setQuery(searchValue);
            }}
          >
            <p
              className="hide-search-btn-text d-flex justify-content-center align-items-center"
              style={{ marginBottom: "0rem" }}
            >
              Search
            </p>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/search.png"
              className="hide-search-btn-icon "
            />
          </Button>
        </div>
      </div>

      <button
        className="d-flex justify-content-center align-items-center border-0 py-1 mt-3 mx-4 rounded-pill hide-long-category-btn"
        onClick={modalhandler}
        style={{ backgroundColor: "#f3f4f6", width: "93%" }}
      >
        <img
          className="me-2"
          width="30"
          height="30"
          src="https://img.icons8.com/material-outlined/24/0096FF/four-squares.png"
        />
        <span className="">Categories</span>
      </button>

      {modal && (
        <div
          className="scroll mt-2 mt-lg-0"
          style={{ backgroundColor: "#f3f4f6", maxWidth: "1296px" }}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="500"
        >
          <div className="row"></div>
          <div className="row">
            {parentCategories.map((pCategory: any) => (
              <div className="col">
                <h5>{pCategory}</h5>
              </div>
            ))}
            <div className="row">
              {subCategories.map((sCategory: any) => (
                <div className="col">
                  {sCategory.map((s: any, index: any) => (
                    <button
                      // className="cursor-pointer"
                      style={{ cursor: "pointer" }}
                      className="border-0 bg-none"
                      onClick={() => {
                        setSubCategory(s);
                        // getProducts();
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCategory;
