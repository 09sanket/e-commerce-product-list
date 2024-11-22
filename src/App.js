import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ProductList from "./components/ProductList"; // Assuming you have a ProductList component to display the products
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
      {
        id: Date.now().toString(),
        title: "New Product",
        variants: [{ id: 1, title: "Default Variant", price: "0" }],
        discount: "",
        image: { src: "" },
      },
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
      updatedProducts[editingProductIndex] = selectedProduct;
    } else {
      updatedProducts.push(selectedProduct);
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
    const { source, destination } = result;
    if (!destination) return; // If dropped outside

    const updatedProducts = Array.from(products);
    const [movedItem] = updatedProducts.splice(source.index, 1);
    updatedProducts.splice(destination.index, 0, movedItem);

    setProducts(updatedProducts);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}> {/* Wrap everything in DragDropContext */}
      <div className="app">
        <h1 className="app-title">Product Management</h1>
        <ProductList
          products={products}
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
    </DragDropContext>
  );
};

export default App;
