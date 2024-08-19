import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { categoriesList } from "../api/api";
import Loader from "../components/loader/loader";
import { debounce } from "../utilities/debounce";
import ProgressIndicator from "../utilities/show_progress_indicator";
import ErrorMessage from "../utilities/error_box";

const CategoryLookup = (props) => {
  const loaderRef = useRef(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [filterKeys, setFilterKeys] = useState({
    name: "",
    description: "",
    path: "",
    createdAt: "",
  });
  const {
    data,
    isLoading,
    error,
    status,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories", sortConfig],
    queryFn: ({ pageParam }) =>
      categoriesList({
        pageParam,
        sortKey: sortConfig.key,
        sortOrder: sortConfig.direction,
        filterKeys,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    refetch();
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

  const category = (item) => {
    props.selectCategory(item);
  };

  return (
    <div className="relative overflow-y-auto shadow-md sm:rounded-lg h-72">
      {isLoading && <ProgressIndicator message="Loading categories" />}
      {error && (
        <ErrorMessage
          content="Something went wrong in fetching categories. Please try after some time"
          onClose={closeErrorBox}
        />
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
              Category Path
              <button
                onClick={() => handleSort("path")}
                className="ml-2 focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className={`transform transition-transform ${
                    sortConfig.key === "path" && sortConfig.direction === "asc"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {status === "success" &&
            data.pages.map((page) =>
              page.data.map((item) => (
                <tr
                  onClick={() => category(item)}
                  key={item.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.path}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <Loader />
        </div>
      )}
      <div ref={loaderRef} className="h-1"></div>
    </div>
  );
};

export default CategoryLookup;
