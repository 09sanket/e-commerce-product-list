import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchProducts } from "../api/products";
import "./ProductPicker.css";

const ProductPicker = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isOpen) loadProducts();
  }, [isOpen, page, searchTerm]);

  const loadProducts = async () => {
    const result = await fetchProducts(searchTerm, page);
    setProducts((prev) => [...prev, ...result]);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="product-picker-modal">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-list" onScroll={handleScroll}>
        {products.map((product) => (
          <div className="product-item" key={product.id} onClick={() => onSelect(product)}>
            <img src={product.image.src} alt={product.title} />
            <span>{product.title}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ProductPicker;
