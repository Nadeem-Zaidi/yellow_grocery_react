import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../components/loader/loader";
import Modal from "../components/modal/loading_modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../utilities/error_box";
import ProgressIndicator from "../utilities/show_progress_indicator";
import { debounce } from "../utilities/debounce";
import { useState, useEffect, useCallback } from "react";
import { fetchMeasureUnit } from "../api/api";

const MeasureLookup = ({ selectItem }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const [filterKeys, setFilterKeys] = useState({ unit: '', description: '', abbreviation: '' });
    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["measureunit", sortConfig, filterKeys],
        queryFn: ({ pageParam = 2 }) => fetchMeasureUnit({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction, filterKeys }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined
    });

    const [measureunits, setMeasureunits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (status === 'success' && data) {
            const allMeasureunits = data.pages.flatMap(page => page.data);
            setMeasureunits(allMeasureunits);
        }
    }, [status, data]);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
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

    const selectItemController = (item) => {
        selectItem(item)

    }

    return (
        <div className="container mx-auto p-2 relative bg-gray-100">
            {loading && <ProgressIndicator message={"Saving Record"} />}
            {errorMessage && <ErrorMessage content={errorMessage} />}
            <h1 className="text-3xl font-bold mb-6">Measure Lookup</h1>
            <div className="flex justify-end mt-2 mb-2">
                <button
                    type="button"
                    className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2"
                    onClick={() => setShowFilter(true)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                </button>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        {showFilter ? (
                            <tr>
                                <th className="px-6 py-3">
                                    <div>
                                        <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input
                                            onChange={handleFilter}
                                            type="text"
                                            id="unit"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </th>
                                <th className="px-6 py-3">
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input
                                            onChange={handleFilter}
                                            type="text"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </th>
                                <th className="px-6 py-3">
                                    <div>
                                        <label htmlFor="abbreviation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Path</label>
                                        <input
                                            onChange={handleFilter}
                                            type="text"
                                            id="abbreviation"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </th>
                            </tr>
                        ) : (
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abbreviation</th>
                            </tr>
                        )}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {measureunits?.map((item) => (
                            <tr key={item.id} onClick={() => selectItemController(item)}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.abbreviation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFetchingNextPage && <Loader />}
            {error && <ErrorMessage content={error.message} />}
        </div>
    );
};

export default MeasureLookup;
