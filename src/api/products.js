export const fetchProducts = async (query = "", page = 0, limit = 10) => {
  try {
      const response = await fetch(
          `https://cors-anywhere.herokuapp.com/http://stageapi.monkcommerce.app/task/products/search?search=${query}&page=${page}&limit=${limit}`,
          {
            headers: { 'x-api-key': '72njgfa948d9aS7gs5' },
          }
        );

      if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure that the data contains variants
      if (Array.isArray(data)) {
          return data.map((product) => ({
              ...product,
              image: product.image || { src: "https://via.placeholder.com/150" },
              title: product.title || "Untitled Product",
              variants: product.variants || [], // Include variants if they exist
          }));
      } else {
          console.error("Unexpected API response format:", data);
          return [];
      }
  } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
  }
};
