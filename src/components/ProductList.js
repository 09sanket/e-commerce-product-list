import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

import "./ProductList.css";

const ProductList = ({ products, onRemove, onEdit, applyDiscount }) => {
 
  const [showDiscountControls, setShowDiscountControls] = useState(
    Array(products.length).fill(false) 
  );

  const handleAddDiscount = (index) => {
    const updatedControls = [...showDiscountControls];
    updatedControls[index] = true; 
    setShowDiscountControls(updatedControls);
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={product.id.toString()} className="product-item">
          <div className="product-details">
            <img
              src={product.image?.src || "https://via.placeholder.com/150"}
              alt={product.title || "Product"}
              className="product-image"
            />
            <div className="product-title-section">
              <span className="product-title">{product.title}</span>
              <button
                className="edit-btn"
                onClick={() => onEdit(index, product.title)} 
              >
                <FaEdit />
              </button>
            </div>
          </div>

          
          {!showDiscountControls[index] ? (
            <button
              className="add-discount-btn"
              onClick={() => handleAddDiscount(index)}
            >
              Add Discount
            </button>
          ) : (
            <div className="discount-controls">
              <select
                className="discount-type"
                onChange={(e) => applyDiscount(index, e.target.value)}
              >
                <option value="percentage">%</option>
                <option value="flat">Flat</option>
              </select>
              <input
                type="number"
                className="discount-value"
                placeholder="Value"
                onChange={(e) => applyDiscount(index, e.target.value)}
              />
            </div>
          )}

          <button
            className="remove-btn"
            onClick={() => onRemove(index)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
