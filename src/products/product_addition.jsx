import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "../components/modal/loading_modal";
import Modal from "../components/modal/loading_modal";
import { fetchProduct } from "../api/api";
import addProduct from "./product_sideeffects/product_side_effects";
import { useParams, useNavigate } from "react-router-dom";

import ProgressIndicator from "../utilities/show_progress_indicator";
import TextField from "../utilities/textfield";
import CategoryLookup from "../lookups/categories_lookup";
import ErrorMessage from "../utilities/error_box";
import { useQuery } from "@tanstack/react-query";

const AddProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productVariation, setProductVariation] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productTags, setProductTags] = useState("");
  const [categoryLookup, setCategoryLookup] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState(null);
  const navigate = useNavigate();

  const {
    data,
    isLoading: queryLoading,
    error: queryError,
    status,
    refetch,
  } = useQuery({
    queryKey: ["productWithId", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (status === "success" && data) {
      setProductId(data.id); // Assuming the product ID is being set here
      setProductName(data.name);
      setProductDescription(data.description);
      setCategory(data.category);
      setCategoryId(data.categoryid);
      setProductBrand(data.brand);
      setProductTags(data.tags.join(", "));
    }
  }, [status, data]);

  const productNameController = (e) => {
    setProductName(e.target.value);
  };
  const productDescriptioController = (e) => {
    setProductDescription(e.target.value);
  };
  const categoryController = (e) => {
    setCategory(e.target.value);
  };
  const productBrandController = (e) => {
    setProductBrand(e.target.value);
  };
  const productTagsController = (e) => {
    setProductTags(e.target.value);
  };
  const categoryLookupController = (e) => {
    setCategoryLookup(true);
  };
  const selectedCategoryPath = (item) => {
    setCategory(item.path);
    setCategoryId(item.id);
    setCategoryName(item.name);
    setCategoryDescription(item.description ? item.description : "");
    setCategoryLookup(false);
  };
  const closeCategoryLookup = () => {
    setCategoryLookup(false);
  };

  const categoryNameController = (e) => {
    setCategoryName(e.target.value);
  };

  const navigateToProductVariation = (id) => {
    navigate(`/products/variations/${id}`);
  };

  const navigateToUpdateProductVariation = (id) => {
    navigate(`/products/updatevariations/${id}`);
  };

  const formController = async (e) => {
    e.preventDefault();
    const data = {
      name: productName,
      description: productDescription,
      category: category,
      categoryid: categoryId,
      brand: productBrand,
      tags: productTags.split(","),
    };
    setIsLoading(true);

    try {
      const result = await addProduct(data);

      setProductId(result.id);
      await refetch();
      setIsLoading(false);
      setInformation(`Product created with name "${result.name}"`);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError(e);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={formController} className="p-6 bg-white rounded-lg">
      {information && (
        <ErrorMessage
          content={information}
          onClose={() => {
            setInformation(null);
          }}
          boxType="info"
        />
      )}
      {error && (
        <ErrorMessage
          content="Error in creating product"
          onClose={() => {
            setError(null);
          }}
          boxType="error"
        />
      )}
      {isLoading && <ProgressIndicator message="Saving Product" />}
      {categoryLookup && (
        <Modal onClose={closeCategoryLookup}>
          <CategoryLookup selectCategory={selectedCategoryPath} />
        </Modal>
      )}
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TextField
            name="Product Name"
            value={productName}
            onChange={productNameController}
            className="w-full focus:border-blue-600 focus:outline-none"
          />
          <TextField
            name="Description"
            value={productDescription}
            onChange={productDescriptioController}
            className="w-full focus:border-blue-600 focus:outline-none"
          />
          <div className="relative">
            <TextField
              name="Category"
              value={category}
              onChange={categoryController}
              className="flex-grow focus:border-blue-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={categoryLookupController}
              className="p-2 absolute inset-y-0 right-0  text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <TextField
            name="Category"
            value={categoryName}
            readOnly={true}
            className="w-full focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-6">
          <TextField
            name="Brand"
            value={productBrand}
            onChange={productBrandController}
            className="w-full focus:border-blue-600 focus:outline-none"
          />
          <div>
            <label htmlFor="tags" className="block mb-2 text-gray-500">
              Tags
            </label>
            <textarea
              value={productTags}
              onChange={productTagsController}
              id="tags"
              rows="4"
              className="block w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
              placeholder="Type tags separated by commas"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 fixed bottom-2 right-2">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-primary rounded-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          {isLoading ? "Submitting..." : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
