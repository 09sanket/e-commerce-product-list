import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchProducts } from "../api/products";
import "./ProductPicker.css";

const ProductPicker = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showVariants, setShowVariants] = useState({}); 

  useEffect(() => {
    if (isOpen) {
      setProducts([]); 
      setPage(1); 
      loadProducts();
    }
  }, [isOpen, searchTerm]);

  useEffect(() => {
    if (page > 1) {
      loadProducts();
    }
  }, [page]);

  const loadProducts = async () => {
    try {
      const result = await fetchProducts(searchTerm, page);
      const productsWithVariants = (result || []).map((product) => ({
        ...product,
        variants: generateVariants(product), 
      }));
      setProducts((prev) => [...prev, ...productsWithVariants]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const generateVariants = (product) => {
    // Generate sample variants (for demonstration)
    return [
      { id: `${product.id}-small-red`, title: "Small - Red" },
      { id: `${product.id}-small-white`, title: "Small - White" },
      { id: `${product.id}-medium-red`, title: "Medium - Red" },
      { id: `${product.id}-medium-white`, title: "Medium - White" },
    ];
  };

  const toggleVariants = (productId) => {
    setShowVariants((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleProductClick = (product) => {
    // Add the base product to the selected list
    onSelect({ id: product.id, title: product.title, image: product.image.src });
  };

  const handleVariantClick = (product, variant) => {
    // Add the selected variant to the list
    onSelect({
      id: variant.id,
      title: `${product.title} - ${variant.title}`,
      image: product.image.src,
    });
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="product-picker-modal">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="product-list" onScroll={handleScroll}>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            {/* Main Product */}
            <div
              className="product-main clickable"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image.src || "/placeholder.jpg"} 
                alt={product.title}
                className="product-image"
              />
              <span>{product.title}</span>
            </div>

            {/* Toggle Variants */}
            <button
              className="toggle-variants-btn"
              onClick={() => toggleVariants(product.id)}
            >
              {showVariants[product.id] ? "Hide Variants" : "Show Variants"}
            </button>

            {/* Variants List */}
            {showVariants[product.id] && (
              <div className="product-variants">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="variant-item clickable"
                    onClick={() => handleVariantClick(product, variant)}
                  >
                    <span>{variant.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ProductPicker;
