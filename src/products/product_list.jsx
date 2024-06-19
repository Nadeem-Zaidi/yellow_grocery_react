import React, { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faThList, faTh, faArrowUp, faFilter } from "@fortawesome/free-solid-svg-icons";

import ProductDetail from './product_detail';
import ProductAddition from "./product_addition";
import ProgressIndicator from "../utilities/show_progress_indicator";
import { fetchProducts } from "../api/api";
import { debounce } from "../utilities/debounce";

const ProductList = () => {
    const [showFilter, setShowFilter] = useState(false)
    const [filterKeys, setFilterKeys] = useState({ name: '', description: '', category: '', brand: '' })
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["products", sortConfig],
        queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction, filterKeys }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
    });



    const navigate = useNavigate();

    const productDetails = (product) => {
        navigate(`/products/${product.id}`);
    };

    const handleSort = async (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
        await refetch();
    };

    const showAddProductModal = () => {
        setShowCreateProductModal(true);
    };

    const closeAddProductModal = () => {
        setShowCreateProductModal(false);
    };

    const navigateToProductAdditionPage = () => {
        navigate('/products/addProduct');
    };
    const filterController = () => {
        setShowFilter(prev => !prev)
    }
    const debouncedFilter = useCallback(
        debounce((filterObj) => {
            setFilterKeys(filterObj);
            refetch()
        }, 400), []
    )

    const handleFilter = (e) => {
        const { id, value } = e.target
        setFilterKeys((prev) => {
            const newFilterKeys = { ...prev, [id]: value }
            debouncedFilter(newFilterKeys)
            return newFilterKeys
        })

    }
    console.log(filterKeys)

    return (
        <div className="flex flex-col p-4">
            {isLoading && <ProgressIndicator message="Loading Products" />}
            <div className="overflow-x-auto">
                <div className="min-w-full shadow-md rounded-lg overflow-hidden">
                    <div className="flex justify-end mt-2 mb-2">
                        <button className="bg-gray text-white rounded-full w-10 h-10 flex items-center justify-center mx-2" onClick={navigateToProductAdditionPage}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button className=" bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center" onClick={filterController}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {showFilter ? <tr>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input onChange={handleFilter} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input onChange={handleFilter} type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <input onChange={handleFilter} type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                        <input onChange={handleFilter} type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                            </tr> :
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Brand
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Available In
                                    </th>
                                </tr>
                            }




                        </thead>
                        <tbody>
                            {status === 'success' && data.pages.map((page, pageIndex) => (
                                page.data.map((item) => (
                                    <tr key={item.id} onClick={() => productDetails(item)} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.brand}
                                        </td>
                                        <td className="px-6 py-4">

                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                    <button onClick={navigateToProductAdditionPage} className="bg-slate-600 text-white">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
