import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import CategoryLookup from "../lookups/categories_lookup";
import Modal from "../components/modal/loading_modal";
import addProduct, { fetchProduct } from "./product_sideeffects/product_side_effects";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import TextField from "../utilities/textfield";
import TextFieldInList from "../utilities/textfield_inlist";

import { useFetchProductWithIdQuery } from "../store/api/api";

const ProductDetail = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading, error } = useFetchProductWithIdQuery(id)
    const [product, setProduct] = useState({});
    const [productVariation, setProductVariation] = useState([]);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productTags, setProductTags] = useState("");
    const [activateSaveButton, setSaveButton] = useState(false);
    const [categoryLookup, setCategoryLookup] = useState(false);
    const navigate = useNavigate();
    const payload = {}

    useEffect(() => {
        if (isSuccess && data) {
            setProduct(data);
            setProductVariation(data.ProductVariation);
        }
    }, [isSuccess, data]);

    const productNameController = (e) => {
        setProductName(e.target.value);
    };
    const productDescriptioController = (e) => {
        setProductDescription(e.target.value);
    };
    const categoryController = (e) => {
        setCategory(e.target.value);
    };
    const categoryDescriptionController = (e) => {
        setCategoryDescription(e.target.value);
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
    const selectedCategoryPath = (path) => {
        console.log(path)
        setCategory(path);

    };
    const closeCategoryLookup = () => {
        setCategoryLookup(false);
    };

    const navigateToProductVariation = (p) => {
        payload.product = p

        navigate(`/products/variations/${p.id}`, { state: payload })
    };

    const addRow = () => {
        const newRow = {
            id: `new_${productVariation.length + 1}`,
            name: '',
            description: '',
            category: ''

        }
        setProductVariation((prev) => [...prev, newRow])
    }

    const navigateToUpdateProductVariation = (id) => {
        navigate(`/products/updatevariations/${id}`)
    }

    const formController = async (e) => {
        e.preventDefault();
        const data = {
            name: productName,
            description: productDescription,
            category: category,
            brand: productBrand,
            tags: productTags.split(",")
        };
        const result = await addProduct(data);
        setProduct(result);
    };


    const selectCategory = (path) => {
        console.log(path)

    }
    return (
        <form onSubmit={formController} className="p-8 bg-white shadow-lg rounded-lg">
            <div className="flex flex-row mb-4">
                <button className="bg-gray-200 px-4 py-2 rounded-l-md">Product</button>
                <button className="bg-gray-200 px-4 py-2 rounded-r-md ml-1">Specification</button>
            </div>
            {categoryLookup && (
                <Modal onClose={closeCategoryLookup}>
                    <CategoryLookup selectCategory={selectCategory} onClose={closeCategoryLookup} />
                    {/* <CategoriesLookup onClose={closeCategoryLookup} selectCategory={selectedCategoryPath} /> */}
                </Modal>
            )}
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                    <TextField name="Product Name" value={product.name} onChange={productNameController} readOnly={true} />
                    <TextField name="Description" value={product.description} onChange={productDescriptioController} />

                    <div flex flex-row>
                        <TextField name="Category" value={product.category} onChange={categoryController} />
                        <button type="button" onClick={categoryLookupController} className=" text-gray-500">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <TextField name="Category Description" value={product.description} readOnly={true} />
                </div>

                <div className="space-y-6">
                    <TextField name="Brand" value={product.brand} onChange={productBrandController} />
                    <div>
                        <label htmlFor="tags" className="block mb-2 text-gray-500">
                            Tags
                        </label>
                        <textarea
                            value={product.tags}
                            onChange={productTagsController}
                            id="tags"
                            rows="4"
                            className="block w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Type tags separated by commas"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Product Variation</h2>
                {productVariation.length === 0 ? (
                    <button onClick={() => { navigateToProductVariation(product) }} type="button" className="bg-gray-200 rounded-md px-4 py-2">
                        Add Variation
                    </button>
                ) : (
                    <div>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productVariation.map((variation, index) => (
                                    <tr key={index} onClick={() => navigateToUpdateProductVariation(variation.id)}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <TextFieldInList value={variation.name} onChange={() => { }} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <TextFieldInList value={variation.description} onChange={() => { }} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <TextFieldInList value={variation?.product?.category} onChange={() => { }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        Another Button
                        <button onClick={() => navigateToProductVariation(product)} type="button" className="mt-4 bg-gray-200 rounded-md px-4 py-2">
                            Add Variation Another
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
        </form>
    );
};

export default ProductDetail;
