import React from "react";

const SideBar = ({ showAllProductsHandler }) => {
  return (
    <div className="sideBarSection">
      <ul>
        <li onClick={showAllProductsHandler}>All Products</li>
        
      </ul>
    </div>
  );
};

export default SideBar;
