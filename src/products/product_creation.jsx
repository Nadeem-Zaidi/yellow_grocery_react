import { useQuery } from "@tanstack/react-query";
import TextField from "../utilities/textfield";
import { createProduct, fetchProduct } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSave,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/modal/loading_modal";
import CategoryLookup from "../lookups/categories_lookup";
import BrandLookup from "../lookups/brands_lookup";
import { TrendingUp } from "@mui/icons-material";
import ProductVariationList from "./product_variation_list";
import ProgressIndicator from "../utilities/show_progress_indicator";
import ErrorMessage from "../utilities/error_box";

const NewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryPath, setCategoryPath] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryLookup, setCategoryLookup] = useState(false);
  const [brand, setBrand] = useState("");
  const [unit, setUnit] = useState("");
  const [tags, setTags] = useState([]);
  const [brandLookup, setBrandLookup] = useState(false);
  const [productTags, setProducTags] = useState([]);
  const [variationId, setVariationId] = useState(null);
  const [productVariation, setProductVariation] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const { data, isLoading, error, status } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only run the query if id is available
  });

  useEffect(() => {
    if (status === "success" && data) {
      console.log(data);
      const products = data.data;
      console.log(products);
      if (products.length === 1) {
        const product = products[0];
        setProductId(product.id);
        setProductName(product.name);
        setProductDescription(product.description);
        setCategoryPath(product.category);
        setBrand(product.brand);
        setUnit(product.unit);
        setTags(product.tags);
        setVariationId(product.productvariation.id);
        setProductVariation(product.ProductVariation);
      }
    }
  }, [status, data]);

  const productNameController = (e) => {
    setProductName(e.target.value);
  };

  const productDescriptionController = (e) => {
    setProductDescription(e.target.value);
  };

  const tagsController = (e) => {
    setTags(e.target.value.split(","));
  };

  const selectCategory = (item) => {
    setCategoryPath(item.path);
    setCategoryId(item.id);
    setCategoryDescription(item.description);
    setCategoryLookup(false);
  };

  const categoryLookupController = () => {
    setCategoryLookup(true);
  };

  const brandLookupController = () => {
    setBrandLookup(true);
  };

  const selectBrand = (brandName) => {
    setBrand(brandName);
    setBrandLookup(false);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    const data = {
      ...(productName &&
        productName.trim() !== "" && { name: productName.trim() }),
      ...(productDescription &&
        productDescription.trim() !== "" && {
          description: productDescription.trim(),
        }),
      ...(categoryPath &&
        categoryPath.trim() !== "" && { category: categoryPath.trim() }),
      ...(categoryId &&
        categoryId.trim() !== "" && { categoryid: categoryId.trim() }),
      ...(brand && brand.trim() !== "" && { brand: brand.trim() }),
      ...(tags && tags.length > 0 && { tags: tags }),
    };

    console.log(data);

    try {
      const newProduct = await createProduct(data);

      if (newProduct) {
        alert(newProduct.name);
      }
    } catch (error) {
      console.log(error);
      setSaveLoading(false);
      setSaveError("Some thing went wrong in creating a product");
    } finally {
      setSaveLoading(false);
    }
    setSaveLoading(false);
  };

  const closeErrorBox = () => {
    setSaveError(null);
  };

  const navigateToProductVariation = () => {
    if (!id) {
      alert("Product is empty");
    } else {
      navigate(`/products/variations/${id}`);
    }
  };

  return (
    <>
      <form onSubmit={formHandler}>
        {saveLoading && <ProgressIndicator message="Saving Product" />}
        {saveError && (
          <ErrorMessage content={saveError} onClose={closeErrorBox} />
        )}
        <div className="bg-gray-200 flex justify-between px-2 py-2">
          <p>Product Details</p>
          <div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-9 px-1">
          {categoryLookup && (
            <Modal>
              <div className="h-64">
                <CategoryLookup selectCategory={selectCategory} />
              </div>
            </Modal>
          )}
          {brandLookup && (
            <Modal>
              <div className="h-64">
                <BrandLookup selectBrand={selectBrand} />
              </div>
            </Modal>
          )}
          <div className="space-y-6">
            <TextField
              name="Product Name"
              value={productName}
              onChange={productNameController}
              className="w-full focus:border-blue-600 focus:outline-none"
            />
            <TextField
              name="Product Description"
              value={productDescription}
              onChange={productDescriptionController}
              className="w-full focus:border-blue-600 focus:outline-none"
            />
            <div className="space-y-6 relative">
              <TextField
                name="Category"
                value={categoryPath}
                readOnly={true}
                className="w-full focus:border-blue-600 focus:outline-none"
              />
              <div className="absolute right-0 top-0">
                <button type="button" onClick={categoryLookupController}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
          </div>
          <div className="relative space-y-6">
            <TextField
              name="Brand"
              value={brand}
              readOnly={true}
              className="w-full focus:border-blue-600 focus:outline-none"
            />
            <div className="absolute right-0 top-0">
              <button type="button" onClick={brandLookupController}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <label htmlFor="tags" className="block mb-2 text-gray-500">
              Tags
            </label>
            <textarea
              value={tags.join(",")}
              onChange={tagsController}
              id="tags"
              rows="3"
              className="block w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
              placeholder="Type tags separated by commas"
            />
          </div>
        </div>
      </form>
      <div className="flex flex-row justify-between bg-gray-200 px-2 mt-10">
        <div>Variations</div>
        <div className="flex">
          <button
            type="button"
            className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center"
            onClick={navigateToProductVariation}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <ProductVariationList productId={productId} />
      <div></div>
    </>
  );
};

export default NewProduct;
