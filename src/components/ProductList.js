import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit } from "react-icons/fa"; // Import an edit icon

import "./ProductList.css";

const ProductList = ({ products, onRemove, onEdit, applyDiscount }) => {
  // State to track the visibility of the discount controls for each product
  const [showDiscountControls, setShowDiscountControls] = useState(
    Array(products.length).fill(false) // Initialize as false, meaning no discount is shown initially
  );

  const handleAddDiscount = (index) => {
    const updatedControls = [...showDiscountControls];
    updatedControls[index] = true; // Show discount controls for the selected product
    setShowDiscountControls(updatedControls);
  };

  return (
    <Droppable droppableId="products">
      {(provided) => (
        <div
          className="product-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {products.map((product, index) => (
            <Draggable
              key={product.id.toString()}
              draggableId={product.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  className="product-item"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
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
                        onClick={() => onEdit(index, product.title)} // Trigger onEdit with product title
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>

                  {/* Add Discount Button */}
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
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ProductList;
