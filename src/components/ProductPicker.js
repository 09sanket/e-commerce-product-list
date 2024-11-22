import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchProducts } from "../api/products";
import "./ProductPicker.css";

const ProductPicker = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showVariants, setShowVariants] = useState({}); // Track which products have their variants shown
  const [selectedVariants, setSelectedVariants] = useState({}); // Track selected variants

  useEffect(() => {
    if (isOpen) loadProducts();
  }, [isOpen, page, searchTerm]);

  const loadProducts = async () => {
    try {
      const result = await fetchProducts(searchTerm, page);
      setProducts((prev) => [...prev, ...(result || [])]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  const toggleVariants = (productId) => {
    setShowVariants((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants((prev) => {
      const productVariants = prev[productId] || [];
      const isSelected = productVariants.includes(variant);

      return {
        ...prev,
        [productId]: isSelected
          ? productVariants.filter((v) => v !== variant) // Remove if already selected
          : [...productVariants, variant], // Add if not selected
      };
    });
  };

  const addVariants = (productId, productTitle) => {
    if (selectedVariants[productId]?.length > 0) {
      selectedVariants[productId].forEach((variant) => {
        onSelect({
          id: `${productId}-${variant}`,
          title: `${productTitle} ${variant}`,
        });
      });
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
          <div key={product.id} className="product-item">
            <div className="product-main">
              <img src={product.image.src} alt={product.title} />
              <span>{product.title}</span>
              <button
                className="toggle-variants-btn"
                onClick={() => toggleVariants(product.id)}
              >
                {showVariants[product.id] ? "Hide Variants" : "Show Variants"}
              </button>
            </div>
            {showVariants[product.id] && (
              <div className="product-variants">
                {[1, 2, 3].map((variant) => (
                  <div key={`${product.id}-${variant}`} className="variant-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          selectedVariants[product.id]?.includes(variant) || false
                        }
                        onChange={() => handleVariantChange(product.id, variant)}
                      />
                      {product.title} {variant}
                    </label>
                  </div>
                ))}
                <button
                  className="add-variants-btn"
                  onClick={() => addVariants(product.id, product.title)}
                >
                  Add Selected Variants
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ProductPicker;
