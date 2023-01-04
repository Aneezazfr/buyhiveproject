import React from "react";
import ProductFilter from "./Filter/ProductFilters";

const SideBar = () => {
  return (
    <div className="border rounded px-3 py-5" style={{minHeight: "85%"}}>
      <ProductFilter />
    </div>
  );
};

export default SideBar;
