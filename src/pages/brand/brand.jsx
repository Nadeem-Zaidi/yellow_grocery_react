import { useInfiniteQuery } from "@tanstack/react-query";
import { addBrand, addBrands, fetchBrand } from "../../api/api";
import { useCallback, useState, useEffect } from "react";
import { Filter, LastPage } from "@mui/icons-material";
import { debounce } from "../../utilities/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import ProgressIndicator from "../../utilities/show_progress_indicator";
import ErrorMessage from "../../utilities/error_box";

const Brand = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "abbreviation",
    direction: "asc",
  });
  const [filterKeys, setFilterKeys] = useState({
    name: "",
    description: "",
    abbreviation: "",
  });
  const [showFilterRowField, setShowFilterRowField] = useState(false);
  const {
    data,
    isLoading,
    error,
    status,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["brands"],
    queryFn: ({ pageParam = 1 }) =>
      fetchBrand({
        pageParam,
        sortKey: sortConfig.key,
        sortOrder: sortConfig.direction,
        filterKeys,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });

  const [brands, setBrands] = useState([]);
  const [brandsToUpdate, setBrandsToUpdate] = useState([]);
  const [updatedBrandList, setUpdatedBrandList] = useState([]);
  const [isLoadingDuringSave, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setUpdatedBrandList([]);
    Object.entries(brandsToUpdate).forEach(([key, updatedItem]) => {
      setUpdatedBrandList((prevList) => [...prevList, updatedItem]);
    });
  }, [brandsToUpdate]);

  useEffect(() => {
    if (status === "success" && data) {
      const brandsData = data.pages.flatMap((page) => page.data);
      setBrands(brandsData);
    }
  }, [status, data]);

  console.log("data");

  console.log(data && data.pages);
  console.log("****data*****");

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    refetch();
  };

  const debouncedFilter = useCallback(
    debounce((filterObject) => {
      setFilterKeys(filterObject);
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

  const showFilter = () => {
    setShowFilterRowField((prev) => !prev);
  };

  const closeErrorBox = () => {
    setShowErrorBox(false);
  };

  const onChangeInput = useCallback(
    (data, e) => {
      const { name, value } = e.target;
      console.log(name, value);

      // Update the brands array
      setBrands((prevBrands) =>
        prevBrands.map((item) =>
          item.id === data.id ? { ...item, [name]: value } : item
        )
      );

      // Update the brandsToUpdate array if the item is not new
      if (!data.isNew) {
        setBrandsToUpdate((prevList) => {
          const updatedItem = {
            ...prevList.find((item) => item.id === data.id),
            [name]: value,
            id: data.id,
          };
          return [
            ...prevList.filter((item) => item.id !== data.id),
            updatedItem,
          ];
        });
      }
    },
    [brands]
  );

  const addRow = useCallback(() => {
    const newRow = {
      id: `new_${brands.length + 1}`,
      name: "",
      description: "",
      abbreviation: "",
      isNew: true,
    };
    setBrands((prevAttributes) => [...prevAttributes, newRow]);
  }, [brands]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (updatedBrandList.length > 0) {
      }
      let newAttributes = brands
        .filter((item) => item.isNew)
        .map(({ id, isNew, ...rest }) => rest);
      const result = await addBrands(newAttributes);
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        "Some thing went wrong in saving please try againor try after some time"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className="flex justify-end mt-2 mb-2">
          {isLoadingDuringSave && <ProgressIndicator message="Saving Brands" />}
          {errorMessage && (
            <ErrorMessage
              content="Something went wrong in fetching categories. Please try after some time"
              onClose={closeErrorBox}
            />
          )}
          <button
            type="button"
            className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center"
            onClick={addRow}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            type="button"
            className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abbreviation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      name="name"
                      value={item.name}
                      type="text"
                      onChange={(e) => onChangeInput(item, e)}
                      placeholder="Type Attribute Name"
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      name="description"
                      value={item.description}
                      type="text"
                      onChange={(e) => onChangeInput(item, e)}
                      placeholder="Type Description"
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      name="abbreviation"
                      type="text"
                      value={item.abbreviation}
                      onChange={(e) => onChangeInput(item, e)}
                      placeholder="Type Data Type"
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {deletingStatus ? (
                      <Loader />
                    ) : (
                      <button
                        type="button"
                        onClick={() => deleteItems(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default Brand;
