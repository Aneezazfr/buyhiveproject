import React, { useState, useEffect, useContext } from "react";
import { Products } from "./Products";
// import { PostForm } from '../Posts/PostForm'
import { IProduct } from "../Types/Product";
import axios from "axios";
import { ProductCard } from "./ProductCard";
import AuthContext from "../context/productContext";
import FilterContext from "../context/FilterContext";
import Paginate from "./Paginate";
import ReactPaginate from 'react-paginate';
export interface IProductListProps {
  setProductCount: (arg: number) => void;
  showBox: boolean;
  showList: boolean;
}
export const ProductList: React.FC<IProductListProps> = ({
  setProductCount,
  showBox,
  showList,
}) => {
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
    query,
    setQuery,
    products, setProducts,
  } = useContext(FilterContext);

  // const [products, setProducts] = useState<IProduct[]>([]);

  const authCxt = useContext(AuthContext);

  // const [currentPage, setCurrentPage] = useState(1); //to set initial page
  // const [productsPerPage] = useState(6); // to set items perpage
  // const indexOfLastPost = currentPage * productsPerPage;
  // const indexOfFirstPost = indexOfLastPost - productsPerPage;
  
  // const paginate = (pageNumber: any) => {
  //   console.log(pageNumber);
  //   setCurrentPage(pageNumber.selected);
  // };
  // const previousPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const nextPage = () => {
  //   if (currentPage !== Math.ceil(products.length / postsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  useEffect(() => {
    if (authCxt.getProducts.length <= 18 || authCxt.getProducts.length == 0) {
      getProducts();
      // setProducts(authCxt.getProducts.slice(indexOfFirstPost, indexOfLastPost));
    }
    
    console.log(authCxt.getProducts);
    setProductCount(authCxt.getProducts.length);
  }, [
    minPrice,
    maxPrice,
    MOQ,
    stock_available,
    selectedCategories,
    selectedStock,
    selectCategory,
    query,
    subCategory,
  ]);

  useEffect(() => {
    setProductCount(authCxt.getProducts.length);
    // setProducts(authCxt.getProducts.slice(indexOfFirstPost, indexOfLastPost));
  });

  const getProducts = async () => {
    try {
      let url = "";

      console.log("------------------");
      url = `?minPrice=${minPrice}&maxPrice=${maxPrice}&MOQ=${MOQ}&stock_in_usa=${stock_available}
               &selectedCategories=${encodeURIComponent(
                 JSON.stringify(selectedCategories)
               )}
               &selectedStock=${JSON.stringify(
                 selectedStock
               )}&select_categories=${encodeURIComponent(selectCategory)}`;

      const response = await axios.get(
        `http://localhost:3000/api/v1/products` + url
      );
      const data = response.data;
      console.log("------------------", response);
      // currentPosts = data.products.slice(indexOfFirstPost, indexOfLastPost);
      if (!query) {
        authCxt.setProducts(response.data.products);
      } else {
        authCxt.setProducts(
          response.data.products.filter((data: any) =>
            data.product_name.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
      // setProducts(authCxt.getProducts.slice(indexOfFirstPost, indexOfLastPost));
      setCountProduct(response.data.products); // side bar filter stock product count
      setProductCount(authCxt.getProducts.length); // total product count
      setStockIn(response.data.stock);
      // setCountProduct(response.data.products);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {authCxt.getProducts.length !== 0 ? (
        <>
          <h1></h1>
          <div className="row">
            {products.map((product: IProduct) =>
              showBox ? (
                <Products
                  key={product.id}
                  product_name={product.product_name}
                  images={product.images}
                  stock_in_USA={product.stock_in_USA}
                  minimum_order_quantity={product.minimum_order_quantity}
                  price={product.price}
                  product_certification={product.product_certification}
                  stock_in={product.stock_in}
                  category_name={product.category_name}
                />
              ) : (
                <div></div>
              )
            )}
            {products.map((product: IProduct) =>
              showList ? (
                <ProductCard
                  key={product.id}
                  product_name={product.product_name}
                  images={product.images}
                  stock_in_USA={product.stock_in_USA}
                  minimum_order_quantity={product.minimum_order_quantity}
                  price={product.price}
                  product_certification={product.product_certification}
                  stock_in={product.stock_in}
                  category_name={product.category_name}
                />
              ) : (
                <div></div>
              )
            )}
          </div>
        </>
      ) : (
        <h3 className="text-center" style={{ marginTop: "120px" }}>
          No Products Found
        </h3>
      )}
      {/* <Paginate
        postsPerPage={postsPerPage}
        totalPosts={authCxt.getProducts.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
      /> */}
      {/* <ReactPaginate
        onPageChange={paginate}
        pageCount={Math.ceil(authCxt.getProducts.length / productsPerPage)}
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeLinkClassName={'active'}
      /> */}
    </>
  );
};
