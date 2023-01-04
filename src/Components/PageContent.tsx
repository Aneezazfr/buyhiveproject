import React, { useState, useContext, useEffect } from "react";
import { ProductList } from "./ProductList";
import SideBar from "./SideBar";
import "./SearchCategory.css";
import ReactPaginate from 'react-paginate';
import AuthContext from "../context/productContext";
import FilterContext from "../context/FilterContext";

export const PageContent = () => {
  
  const [productCount, setProductCount] = useState<number>();
  const [showBox, setShowBox] = useState<boolean>(true);
  const [showList, setShowList] = useState<boolean>(false);

  const authCxt = useContext(AuthContext);
  const {
    products,
    setProducts,
  } = useContext(FilterContext);

  const [currentPage, setCurrentPage] = useState(1); //to set initial page
  const [productsPerPage] = useState(6); // to set items perpage
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  
  const paginate = (pageNumber: any) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber.selected + 1);
  };

  const clickEvent1 = (): void => {
    console.log("clicked");
    setShowList(false);
    setShowBox(true);
    console.log({ showBox });
  };

  const clickEvent2 = (): void => {
    console.log("clicked list");
    setShowBox(false);
    setShowList(true);
    console.log({ showList });
  };
  
  useEffect(() => {
    setProducts(authCxt.getProducts.slice(indexOfFirstPost, indexOfLastPost));
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-3 col-sm-6 ">
          <div className="py-4 lead">
            <span>
              <b>Products </b>
            </span>
            <span className="text-muted">({productCount} products)</span>
          </div>
          <SideBar />
        </div>
        <div className="col-md-9 col-sm-6">
          <div className="py-4 text-muted">Buy</div>
          <div className="d-flex pt-4">
            <div className="mr-auto p-2">
              <button onClick={clickEvent1} className="border-0 bg-white">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/null/squared-menu.png"
                />
              </button>
              <button onClick={clickEvent2} className="border-0 bg-white">
                <img src="https://img.icons8.com/material-two-tone/24/null/bulleted-list.png" />
              </button>
            </div>
            <div className="p-2">
              <select className="rounded-pill px-5 py-2 select-arrow">
                <option> Relevance </option>
              </select>
            </div>
            <div className="p-2">
              <ReactPaginate
                onPageChange={paginate}
                pageCount={Math.ceil(authCxt.getProducts.length / productsPerPage)}
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                containerClassName={'pagination pagination-sm'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeLinkClassName={'active'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
              />
            </div>
          </div>
          <ProductList
            setProductCount={setProductCount}
            showBox={showBox}
            showList={showList}
          />
        </div>
      </div>
    </div>
  );
};

export default PageContent;
