import React, { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import ProgressIndicator from "../utilities/show_progress_indicator";
import { fetchProducts } from "../api/api";
import { debounce } from "../utilities/debounce";

const ProductList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterKeys, setFilterKeys] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const {
    data,
    isLoading,
    status,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", sortConfig],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        pageParam,
        sortKey: sortConfig.key,
        sortOrder: sortConfig.direction,
        filterKeys,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });

  const navigate = useNavigate();

  const productDetails = (product) => {
    navigate(`/products/${product.id}`);
  };

  const handleSort = async (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    await refetch();
  };

  const navigateToProductAdditionPage = () => {
    navigate("/products/addProduct");
  };

  const filterController = () => {
    setShowFilter((prev) => !prev);
  };

  const debouncedFilter = useCallback(
    debounce((filterObj) => {
      setFilterKeys(filterObj);
      refetch();
    }, 400),
    []
  );

  const handleFilter = (e) => {
    const { id, value } = e.target;
    setFilterKeys((prev) => {
      const newFilterKeys = { ...prev, [id]: value };
      debouncedFilter(newFilterKeys);
      return newFilterKeys;
    });
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log(`Delete product with id: ${id}`);
  };

  return (
    <div className="flex flex-col p-4">
      {isLoading && <ProgressIndicator message="Loading Products" />}
      <div className="flex justify-end mt-2 mb-2">
        <button
          className="bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-2"
          onClick={navigateToProductAdditionPage}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={filterController}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div>

      {showFilter && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={handleFilter}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                onChange={handleFilter}
                type="text"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                onChange={handleFilter}
                type="text"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                onChange={handleFilter}
                type="text"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-full shadow-md rounded-lg overflow-hidden">
          <div className="overflow-y-auto max-h-[70vh]">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="sticky top-0 bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("brand")}
                  >
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {status === "success" &&
                  data.pages.map((page) =>
                    page.data.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                          onClick={() => productDetails(item)}
                        >
                          {item.name}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => productDetails(item)}
                        >
                          {item.description}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => productDetails(item)}
                        >
                          {item.category}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => productDetails(item)}
                        >
                          {item.brand}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
          {hasNextPage && (
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
