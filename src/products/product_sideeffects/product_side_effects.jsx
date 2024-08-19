const addProduct = async (data) => {
  try {
    const response = await fetch(
      "http://192.168.1.9:3001/grocery/product/createProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      //   console.log(errorMessage);
      throw new Error(JSON.stringify(errorMessage.error));
    }
    const result = await response.json(); // Convert the response to JSON
    console.log("Product added successfully:", result); // Print the result

    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch("http://192.168.1.9:3001/grocery/product");

    if (!response.ok) {
      throw new Error("Error in fetching the product");
    }
    const productList = await response.json();
    return productList;
  } catch (error) {
    throw error;
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await fetch(
      `http://192.168.1.9:3001/grocery/product/${id}`
    );
    if (!response.ok) {
      throw new Error("Error in fetching a product");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchProductVariation = async (id) => {
  try {
    const response = await fetch(
      `http://192.168.1.9:3001/grocery/product/variations/${id}`
    );
    if (!response.ok) {
      throw new Error("Error in fetching productVariation");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error in fetching productVariation");
  }
};
export const fetchProductVariationById = async (id) => {
  try {
    const response = await fetch(
      `http://192.168.1.9:3001/grocery/product/variationbyid/${id}`
    );
    if (!response.ok) {
      throw new Error("Error in fetching productVariation");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error in fetching productVariation");
  }
};

export const addProductVariation = async (data) => {
  try {
    const response = await fetch(
      "http://192.168.1.9:3001/grocery/product/createVariation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      // Log the error message if it exists
      console.log("Error message from response:", errorData.error); // Optional chaining
      throw new Error(errorData.error || "An unknown error occurred"); // Use default message if no message found
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error); // Use console.error for error messages
    throw error;
  }
};

const addVariationSpec = async () => {
  const response = await fetch("http://192.168.1.9:3001/grocery/");
};

export default addProduct;
