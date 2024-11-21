import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductPicker from "./components/ProductPicker";
import AddProductButton from "./components/AddProductButton";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState(null);

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), title: "New Product", variants: [], discount: "" },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (index) => {
    setEditingProductIndex(index);
    setPickerOpen(true);
  };

  const handleProductSelect = (selectedProduct) => {
    const updatedProducts = [...products];
    if (editingProductIndex !== null) {
      updatedProducts.splice(editingProductIndex, 1, ...selectedProduct);
    }
    setProducts(updatedProducts);
    setPickerOpen(false);
    setEditingProductIndex(null);
  };

  const handleApplyDiscount = (index, type, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].discount = { type, value };
    setProducts(updatedProducts);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedProducts = [...products];
    const [removed] = updatedProducts.splice(result.source.index, 1);
    updatedProducts.splice(result.destination.index, 0, removed);
    setProducts(updatedProducts);
  };

  return (
    <div className="app">
      <h1 className="app-title">Product Management</h1>
      <ProductList
        products={products}
        onDragEnd={handleDragEnd}
        onRemove={handleRemoveProduct}
        onEdit={handleEditProduct}
        applyDiscount={handleApplyDiscount}
      />
      <AddProductButton onClick={handleAddProduct} />
      <ProductPicker
        isOpen={isPickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleProductSelect}
      />
    </div>
  );
};

export default App;
