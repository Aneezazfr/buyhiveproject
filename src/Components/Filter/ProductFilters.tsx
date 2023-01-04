import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IProduct } from "../../Types/Product";
import AuthContext from "../../context/productContext";
import FilterContext from "../../context/FilterContext";

export const ProductFilter = () => {
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
    stockIn,
    setStockIn,
    countProduct,
    setCountProduct,
  } = useContext(FilterContext);

  // const [checked, setChecked] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<any>([]);

  const [cat, setCat] = useState<any>([]);
  const authCxt = useContext(AuthContext);

  let count: any;

  useEffect(() => {
    getCategories();
  }, [selectCategory]);
  
  useEffect(() => {
    getCategories();
  },[]);

  const getCategories = async () => {
    try {
      let url=""
      if(selectCategory){
        // debugger
        url = `?selectParentCategory=${encodeURIComponent(selectCategory)}`
      }
      const response = await axios.get(
        `http://localhost:3000/api/v1/categories` + url
      );
      const data = response.data;

      setSubCategories(data.sub_categories);
      setCat(data.psub_category);
      
    } catch (error: any) {
      console.log(error);
    }
  };

  // const handleChange = () => {
  //   if (checked) {
  //     setStockAvailable("false");
  //     setChecked(false);
  //   } else {
  //     setChecked(true);
  //     setStockAvailable("true");
  //   }
  //   console.log(
  //     "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  //   );
  //   console.log(stock_available);
  // };

  return (
    <div>
      <h4>Price</h4>
      <div className="d-flex flex-row mt-2">
        <input
          type="text"
          placeholder="From"
          value={minPrice}
          inputMode="numeric"
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
          className="w-25 rounded-pill"
        />
        <hr className="mx-2" style={{ width: "15px" }}></hr>
        <input
          type="text"
          placeholder="To"
          value={maxPrice}
          inputMode="numeric"
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
          className="input__box w-25 rounded-pill"
        />
      </div>

      <div className="mt-4">
        <h4>MOQ</h4>
        <input
          type="text"
          placeholder="Less Than"
          value={MOQ}
          inputMode="numeric"
          onChange={(e) => {
            setMOQ(e.target.value);
          }}
          className="input__box w-100 py-1 rounded-pill"
        />
      </div>

      

      <div className="mt-4">
        <>
        <h4>{selectCategory}</h4>
        { 
        selectCategory ? (
        cat.map((sCategory: any) => {
          return (
            <div className="form-check m-2">
              <input
                className="form-check-input"
                type="checkbox"
                value={sCategory}
                onChange={(e) => {
                  selectedCategories.includes(e.target.value)
                    ? setSelectedCategories(
                        selectedCategories.filter(
                          (category: any) => category !== e.target.value
                        )
                      )
                    : setSelectedCategories([
                        ...selectedCategories,
                        e.target.value,
                      ]);
                  console.log("selected categories -> ", selectedCategories);
                }}
              ></input>
              {sCategory}
              <span style={{ marginLeft: "10px" }}>
                ({
                  (count = countProduct.filter(
                    (product: any) => product.category_name === sCategory
                  ).length)
                })
              </span>
            </div>
          );
        })
        ) : (
          <div className="mt-4">
        <h4>All Sub Categories</h4>
        {subCategories.map((sCategory: any) => {
          return (
            <div className="form-check m-2">
              <input
                className="form-check-input"
                type="checkbox"
                value={sCategory}
                onChange={(e) => {
                  selectedCategories.includes(e.target.value)
                    ? setSelectedCategories(
                        selectedCategories.filter(
                          (category: any) => category !== e.target.value
                        )
                      )
                    : setSelectedCategories([
                        ...selectedCategories,
                        e.target.value,
                      ]);
                  console.log("selected categories -> ", selectedCategories);
                }}
              ></input>
              {sCategory}
              <span style={{ marginLeft: "10px" }}>
                ({
                  (count = countProduct.filter(
                    (product: any) => product.category_name === sCategory
                  ).length)
                })
              </span>
            </div>
          );
        })}
      </div>
        )
      }
      </>
      </div>

      <div className="mt-4">
        <h4>Stock Available In</h4>
        {stockIn.map((stock_in: any) => {
          return (
            <div className="form-check m-2">
              <input
                className="form-check-input"
                type="checkbox"
                value={stock_in}
                onChange={(e) => {
                  selectedStock.includes(e.target.value)
                    ? setSelectedStock(
                        selectedStock.filter(
                          (stock: any) => stock !== e.target.value
                        )
                      )
                    : setSelectedStock([...selectedStock, e.target.value]);
                  console.log("selected categories -> ", selectedStock);
                }}
              ></input>
              {stock_in}
              <span style={{ marginLeft: "10px" }}>
                (
                {
                  (count = countProduct.filter(
                    (product: any) => product.stock_in === stock_in
                  ).length)
                }
                )
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
