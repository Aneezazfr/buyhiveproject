import { Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { NavBar } from "./Components/NavBar";
import SearchCategory from "./Components/SearchCategory";
import PageContent from "./Components/PageContent";
import Footer from "./Components/Footer";
import FilterContext from "./context/FilterContext";
import { IProduct } from "./Types/Product";
function App() {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [MOQ, setMOQ] = useState<string>("");
  const [stock_available, setStockAvailable] = useState<string>("false");
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedStock, setSelectedStock] = useState<any>([]);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [stockIn, setStockIn] = useState<any>([]);
  const [countProduct, setCountProduct] = useState<IProduct[]>([]);
  const [subCategory, setSubCategory] = useState<any>("");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <>
      <FilterContext.Provider
        value={{
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
          products, 
          setProducts
        }}
      >
        <Container>
          <NavBar />
          <SearchCategory />
          <PageContent />
        </Container>
        <Footer />
      </FilterContext.Provider>
    </>
  );
}
export default App;
