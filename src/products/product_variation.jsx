import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrash,
  faMagnifyingGlassArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  addProductVariation,
  fetchProductVariation,
} from "./product_sideeffects/product_side_effects";
import { fetchProducts } from "./product_sideeffects/product_side_effects";
import {
  useFetchProductsQuery,
  useFetchProductWithIdQuery,
} from "../store/api/api";
import TextField from "../utilities/textfield";
import { createProductVariation, fetchProduct } from "../api/api";
import Loader from "../components/loader/loader";
import ProgressIndicator from "../utilities/show_progress_indicator";
import ErrorMessage from "../utilities/error_box";
import uploadImages from "../firebase/upload_images";
import { ImageUploader } from "../utilities/image_uploader";
import Modal from "../components/modal/loading_modal";
import MeasureLookup from "../lookups/measureunit_lookup";

const ProductVariation = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [variationName, setVariationName] = useState("");
  const [variationDescription, setVariationDescription] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sku, setSku] = useState("");
  const [tags, setTags] = useState([]);
  const [unit, setUnit] = useState("");
  const [stockSize, setStockSize] = useState("");
  const [errormessage, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [unitLookup, setUnitLookup] = useState(false);
  const [unitId, setUnitId] = useState("");

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const { data, isLoading, error, status } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only run the query if id is available
  });

  useEffect(() => {
    if (status === "success" && data) {
      const productData = data.data;
      if (productData.length === 1) {
        const product = productData[0];
        setProductName(product.name);
        setCategory(product.category);
        setCategoryId(product.Category.id);
        setExistingImages(product.images);
      }
    }
  }, [data, status]);

  const variationNameInputController = (e) => {
    setVariationName(e.target.value);
  };

  const variationDescriptionInputController = (e) => {
    setVariationDescription(e.target.value);
  };

  const categoryIdInputController = (e) => {
    setCategoryId(e.target.id);
  };

  const categoryInputController = (e) => {
    setCategory(e.target.value);
  };

  const sellingPriceInputController = (e) => {
    setSellingPrice(e.target.value);
  };

  const mrpInputController = (e) => {
    setMrp(e.target.value);
  };

  const quantityInputController = (e) => {
    setQuantity(e.target.value);
  };

  const categoryController = (e) => {
    setCategory(e.target.value);
  };

  const discountInputController = (e) => {
    setDiscount(e.target.value);
  };
  const skuInputController = (e) => {
    setSku(e.target.value);
  };

  const tagsInputController = (e) => {
    setTags(e.target.value.split(","));
  };
  const stockSizeController = (e) => {
    setStockSize(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    const data = {
      ...(id && id.trim() !== "" && { productid: id }),
      ...(variationName &&
        variationName.trim() !== "" && { name: variationName.toLowerCase() }),
      ...(variationDescription &&
        variationDescription.trim() !== "" && {
          description: variationDescription.toLowerCase(),
        }),
      ...(categoryid &&
        categoryid.trim() !== "" && { categoryid: categoryid.trim() }),
      ...(tags && tags.length > 0 && { tags: tags }),
      ...(sku && sku.trim() !== "" && { sku: sku.trim().toLocaleLowerCase() }),
      ...(sellingprice &&
        sellingprice.trim() !== "" && { sellingprice: sellingprice.trim() }),
      ...(mrp && mrp.trim() !== "" && { mrp: mrp.trim() }),
      ...(discount && discount.trim() !== "" && { discount: discount.trim() }),
      ...(quantity && quantity !== "0" && { quantity: quantity }),
      ...(unitId && unitId.trim() !== "" && { measureUnitId: unitId }),
      ...(stockSize && stockSize.trim() !== "" && { stocksize: stockSize }),
    };
    // if (product.id) data.productid = product.id;
    console.log(data);

    try {
      const uploaded_images_url =
        images.length > 0 ? await Promise.all(images.map(uploadImages)) : [];
      if (uploaded_images_url.length > 0) {
        data.images = uploaded_images_url;
      }
      console.log(data);

      const variation = await createProductVariation(data);
      console.log(data);
      console.log(images);
    } catch (error) {
      setSaveLoading(false);
      console.log(error);
      setError(error);
    } finally {
      setSaveLoading(false);
    }
    setSaveLoading(false);
  };

  const closeErrorBox = () => {
    setError(null);
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setImages((prev) => [...prev, ...fileList]);
  };

  const calculateSellingPrice = () => {
    let sellinPrice = mrp - (mrp * discount) / 100;
    if (sellingprice) setSellingPrice(sellingprice);
  };

  const unitController = () => {
    setUnitLookup(true);
  };

  const selectMeasureLookup = (item) => {
    setUnit(item.unit);
    setUnitId(item.id);
    setUnitLookup(false);
  };

  return (
    <>
      <div className=" p-8">
        {/* {isLoading && <ProgressIndicator message={"Saving"} />}
        {errormessage && <ErrorMessage content={errormessage} />} */}
        {unitLookup && (
          <Modal>
            <div className="h-64">
              <MeasureLookup selectItem={selectMeasureLookup} />
            </div>
          </Modal>
        )}
        <h2 className="text-md font-bold mb-6">Product Variation Details</h2>
        <form onSubmit={formSubmitHandler}>
          <div className="bg-gray-200 flex justify-between px-2 py-2">
            <p>Product Details</p>
            <div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md px-2 py-2 ">
            <TextField
              name="Product Name"
              value={productName}
              readOnly={true}
            />
            <TextField name="Category" value={category} readOnly={true} />
            <TextField
              name="Variation Name"
              value={variationName}
              onChange={variationNameInputController}
            />
            <TextField
              name="Variation Description"
              value={variationDescription}
              onChange={variationDescriptionInputController}
            />
            <TextField name="SKU" value={sku} onChange={skuInputController} />
            <div>
              <label htmlFor="tags" className="block mb-2 text-gray-500">
                Tags
              </label>
              <textarea
                value={tags.join(",")}
                onChange={tagsInputController}
                id="tags"
                rows="4"
                className="block w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
                placeholder="Type tags separated by commas"
              />
            </div>
          </div>
          <div className="px-2 py-2 mt-8">
            <div>Images</div>
            <ImageUploader
              images={images}
              setImages={setImages}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              handleImageChange={handleImageChange}
            />
          </div>

          <h2 className="text-md font-bold mb-6 mt-9">Price Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TextField
              type="number"
              name="MRP"
              value={mrp}
              onChange={mrpInputController}
            />
            <TextField
              type="number"
              name="Selling Price"
              value={sellingprice}
              onChange={sellingPriceInputController}
            />
            <TextField
              type="number"
              name="Discount"
              value={discount}
              onChange={discountInputController}
            />
          </div>
          <h2 className="text-md font-bold mb-6 mt-9">Inventory Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 relative">
              <TextField
                name="Unit"
                value={unit}
                readOnly={true}
                className="w-full focus:border-blue-600 focus:outline-none"
              />
              <div className="absolute right-0 top-0">
                <button type="button" onClick={unitController}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <TextField
              name="Available Quantity"
              value={quantity}
              onChange={quantityInputController}
            />
            <TextField
              name="Stock Size"
              value={stockSize}
              onChange={stockSizeController}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 bg-primary text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Add Variation
          </button>
        </form>
        <h3 className="text-xl font-bold mt-10 mb-4">Specifications</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Value</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with actual data */}
            {[].map((spec) => (
              <tr key={spec.id}>
                <td className="py-2 px-4 border-b">{spec.id}</td>
                <td className="py-2 px-4 border-b">{spec.name}</td>
                <td className="py-2 px-4 border-b">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Add Specification
        </button>
      </div>
    </>
  );
};

export default ProductVariation;
