import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./ProductList.css";

const ProductList = ({ products, onDragEnd, onRemove, onEdit, applyDiscount }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="products">
        {(provided) => (
          <div className="product-list" {...provided.droppableProps} ref={provided.innerRef}>
            {products.map((product, index) => (
              <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                {(provided) => (
                  <div
                    className="product-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="product-details">
                      <img src={product.image.src} alt={product.title} className="product-image" />
                      <input
                        className="product-title"
                        value={product.title}
                        onChange={(e) => onEdit(index, e.target.value)}
                      />
                    </div>
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
                    <button className="remove-btn" onClick={() => onRemove(index)}>
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
    </DragDropContext>
  );
};

export default ProductList;
