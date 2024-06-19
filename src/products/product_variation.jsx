import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addProductVariation, fetchProductVariation } from "./product_sideeffects/product_side_effects";
import { fetchProducts } from "./product_sideeffects/product_side_effects";
import { useFetchProductsQuery, useFetchProductWithIdQuery } from "../store/api/api";
import TextField from "../utilities/textfield";
import Loader from "../components/loader/loader";
import ProgressIndicator from "../utilities/show_progress_indicator";
import ErrorMessage from "../utilities/error_box";


const ProductVariation = () => {
    const location = useLocation()
    const { product } = location.state
    const [variationName, setVariationName] = useState("Apple");
    const [variationDescription, setVariationDescription] = useState("Apple 1kg");
    const [categoryid, setCategoryId] = useState("")
    const [category, setCategory] = useState("");
    const [sellingprice, setSellingPrice] = useState("200")
    const [mrp, setMrp] = useState("300")
    const [discount, setDiscount] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [sku, setSku] = useState("Apple-1kg-pack")
    const [tags, setTags] = useState("apple,fresh,healthy,fruits")
    const [isLoading, setIsLoading] = useState(false)
    const [errormessage, setError] = useState(null)
    const [closeError, setCloseError] = useState(false)






    const variationNameInputController = (e) => {
        setVariationName(e.target.value);
    };

    const variationDescriptionInputController = (e) => {
        setVariationDescription(e.target.value);
    };

    const categoryIdInputController = (e) => {
        setCategoryId(e.target.id)
    }

    const categoryInputController = (e) => {
        setCategory(e.target.value)
    }

    const sellingPriceInputController = (e) => {
        setSellingPrice(e.target.value)
    }

    const mrpInputController = (e) => {
        setMrp(e.target.value)
    }

    const quantityInputController = (e) => {
        setQuantity(e.target.value)
    }



    const categoryController = (e) => {
        setCategory(e.target.value)
    }

    const discountInputController = (e) => {
        setDiscount(e.target.value)
    }
    const skuInputController = (e) => {
        setSku(e.target.value)
    }

    const tagsInputController = (e) => {
        setTags(e.target.value)




    }
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const data = {}
        if (product.id) data.productid = product.id;
        if (product.Category.id) data.categoryid = product.Category.id;
        if (variationName) data.name = variationName;
        if (variationDescription) data.description = variationDescription;
        if (mrp) data.mrp = mrp;
        if (sellingprice) data.sellingprice = sellingprice;
        if (typeof discount !== 'undefined') data.discount = discount;
        if (quantity) data.quantity = quantity;
        if (sku) data.sku = sku;
        if (tags.length > 0) data.tags = tags;
        if (quantity) data.quantity = quantity
        data.images = []
        console.log(data)




        setIsLoading(true)
        try {
            const variation = await addProductVariation(data)


        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setError({ apiError: error.message })

        }
        setIsLoading(false)
    };

    return (
        <div className=" p-8 bg-white sha   ded-lg">
            {isLoading && <ProgressIndicator message={"Saving"} />}
            {errormessage && <ErrorMessage content={errormessage.apiError} />}
            <h2 className="text-md font-bold mb-6">Product Variation Details</h2>
            <form onSubmit={formSubmitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextField name="Product Name" value={product.name} readOnly={true} tclassName="bg-primary-light_50" />
                    <TextField name="Category" value={product.category} readOnly={true} tclassName="bg-primary-light_50" />
                    <TextField name="Variation Name" value={variationName} onChange={variationNameInputController} />
                    <TextField name="Variation Description" value={variationDescription} onChange={variationDescriptionInputController} />
                </div>
                <h2 className="text-md font-bold mb-6 mt-9">Price Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextField name="MRP" value={mrp} onChange={mrpInputController} />
                    <TextField name="Selling Price" value={sellingprice} onChange={sellingPriceInputController} />
                    <TextField name="Discount" value={discount} onChange={discountInputController} />

                </div>
                <h2 className="text-md font-bold mb-6 mt-9">Inventory Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextField name="Available Quantity" value={quantity} onChange={quantityInputController} />


                </div>
                <h2 className="text-md font-bold mb-6 mt-9">SKU and Tags</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextField name="SKU" value={sku} onChange={skuInputController} />
                    <div>
                        <label htmlFor="tags" className="block mb-2 text-gray-500">
                            Tags
                        </label>
                        <textarea
                            value={tags}
                            onChange={tagsInputController}
                            id="tags"
                            rows="4"
                            className="block w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Type tags separated by commas"
                        />
                    </div>

                </div>
                <h2 className="text-md font-bold mb-6 mt-9">Images</h2>
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" multiple />
                    </label>
                </div>


                <button type="submit" className="mt-6 w-full py-2 bg-primary text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
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
    );
};

export default ProductVariation;
