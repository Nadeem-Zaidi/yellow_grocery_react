import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "../components/modal/loading_modal";
import CategoriesLookup from "./components/categories_lookup";
import Modal from "../components/modal/loading_modal";
import addProduct, { fetchProduct } from "./product_sideeffects/product_side_effects";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const productDetail = useQuery(["productDetails", id], () => fetchProduct(id));
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

    useEffect(() => {
        if (productDetail.status === 'success' && productDetail.data) {
            setProduct(productDetail.data);
            setProductVariation(productDetail.data.ProductVariation);
        }
    }, [productDetail.status, productDetail.data]);

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
        setCategory(path);
    };
    const closeCategoryLookup = () => {
        setCategoryLookup(false);
    };

    const navigateToProductVariation = (id) => {
        navigate(`/products/variations/${id}`)
    };

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

    return (
        <form onSubmit={formController} className="p-8 bg-white shadow-lg rounded-lg">

            <div className="flex flex-row mb-4">
                <button className="bg-gray-200 px-4 py-2 rounded-l-md">Product</button>
                <button className="bg-gray-200 px-4 py-2 rounded-r-md ml-1">Specification</button>
            </div>

            {categoryLookup && (
                <Modal onClose={closeCategoryLookup}>
                    <CategoriesLookup onClose={closeCategoryLookup} selectCategory={selectedCategoryPath} />
                </Modal>
            )}

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="relative">
                        <input
                            placeholder=""
                            readOnly
                            value={product.name}
                            onChange={productNameController}
                            className="peer h-12 w-full border-b border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-blue-600 focus:outline-none"
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
                            Product Name
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            placeholder=""
                            value={product.description}
                            onChange={productDescriptioController}
                            className="peer h-12 w-full border-b border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-blue-600 focus:outline-none"
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
                            Description
                        </label>
                    </div>

                    <div className="relative flex items-center">
                        <input
                            placeholder=""
                            value={product.category}
                            onChange={categoryController}
                            className="peer h-12 w-full border-b border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-blue-600 focus:outline-none"
                        />
                        <button type="button" onClick={categoryLookupController} className="ml-2 text-gray-500">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <label className="absolute left-0 -top-3.5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
                            Category
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            placeholder=""
                            value={categoryDescription}
                            onChange={categoryDescriptionController}
                            className="peer h-12 w-full border-b border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-blue-600 focus:outline-none"
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
                            Category Description
                        </label>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <input
                            placeholder=""
                            value={product.brand}
                            onChange={productBrandController}
                            className="peer h-12 w-full border-b border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-blue-600 focus:outline-none"
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
                            Brand
                        </label>
                    </div>

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
                    <button onClick={() => { navigateToProductVariation(product.id) }} type="button" className="bg-gray-200 rounded-md px-4 py-2">
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
                                            <input
                                                name="Name"
                                                value={variation.name}
                                                type="text"
                                                onChange={() => { }}
                                                placeholder="Type name"
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                name="Description"
                                                value={variation.description}
                                                type="text"
                                                onChange={() => { }}
                                                placeholder="Type description"
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                name="Category"
                                                value={variation.product.category}
                                                type="text"
                                                onChange={() => { }}
                                                placeholder="Type category"
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => { navigateToProductVariation(product.id) }} type="button" className="mt-4 bg-gray-200 rounded-md px-4 py-2">
                            Add Variation
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
