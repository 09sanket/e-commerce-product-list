import React from "react";
import "./AddProductButton.css";

const AddProductButton = ({ onClick }) => (
  <button className="add-product-btn" onClick={onClick}>
    Add Product
  </button>
);

export default AddProductButton;
