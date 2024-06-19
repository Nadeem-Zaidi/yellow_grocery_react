import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../components/loader/loader";
import Modal from "../components/modal/loading_modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCreateMeasureunitMutation, useFetchMeasureunitQuery } from "../store/api/api";
import ErrorMessage from "../utilities/error_box";
import ProgressIndicator from "../utilities/show_progress_indicator";
import { debounce } from "../utilities/debounce";

import TextField from "../utilities/textfield";
import { useState, useEffect, useCallback } from "react";
import { createManyMeaureUnit, createMeaureUnit, deleteMeasureUnit, fetchMeasureUnit, updateMeasureUnit } from "../api/api";

const MeasuringUnit = () => {
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const [filterKeys, setFilterKeys] = useState({ unit: '', description: '', abbreviation: '' })
    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["measureunit", sortConfig, filterKeys],
        queryFn: ({ pageParam }) => fetchMeasureUnit({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction, filterKeys }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined
    });

    const [measureunits, setMeasureunits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [existingElementToDelete, setExistingElementToDelete] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);
    const [newAttributeList, setNewAttributeList] = useState([])
    const [updatedItemList, setUpdatedItemList] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const [asLookup, setAsLookup] = useState(false)



    useEffect(() => {
        if (status === 'success' && data) {
            const allMeasureunits = data.pages.flatMap(page => page.data);
            setMeasureunits(allMeasureunits);
        }
    }, [status, data]);

    const unitInputController = (e) => setUnit(e.target.value);
    const abbreviationController = (e) => setAbbreviation(e.target.value);
    const descriptionController = (e) => setDescription(e.target.value);

    const addRow = () => {
        const newRow = {
            id: `new_${measureunits.length + 1}`,
            unit: '',
            description: '',
            abbreviation: '',
            isNew: true
        };
        setMeasureunits([...measureunits, newRow]);
    };

    const onChangeInput = (item, e) => {


        const { name, value } = e.target;

        if (item.isNew) {
            setNewAttributeList(prevList => {
                // Check if the item exists in prevList
                const existingItem = prevList.find(p => p.id === item.id);
                // Spread existingItem if found, otherwise create a new object
                const newAttribute = existingItem ? { ...existingItem, [name]: value } : { id: item.id, [name]: value };
                return [...prevList.filter(p => p.id !== item.id), newAttribute];
            });
        }
        const updatedMeasureunits = measureunits.map(mu => mu.id === item.id ? { ...mu, [name]: value } : mu);
        setMeasureunits(updatedMeasureunits);

        if (!item.new) {

            setUpdatedItemList(prevList => {
                const updatedItem = { ...prevList.find(p => p.id === item.id), [name]: value, id: item.id }
                return [...prevList.filter(p => p.id !== item.id), updatedItem]
            })

        }


    };

    const deleteItems = async (rowitem) => {
        if (rowitem.isNew) {
            setMeasureunits(measureunits.filter(item => item.id !== rowitem.id));
        } else {
            try {
                await deleteMeasureUnit(rowitem.id);
                setMeasureunits(measureunits.filter(item => item.id !== rowitem.id));
            } catch (error) {
                setErrorMessage(error.message || 'Error deleting item');

            }
        }
    };

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
        console.log(id, value)
        setFilterKeys((prev) => {
            const newFilterKeys = { ...prev, [id]: value };
            debouncedFilter(newFilterKeys);
            return newFilterKeys;
        });
    };




    const formHandler = async (e) => {
        e.preventDefault();

        try {
            if (newAttributeList.length == 1) {
                for (let i of newAttributeList) {
                    const result = await createMeaureUnit({ unit: i.unit, description: i.description, abbreviation: i.abbreviation })
                    console.log(result)
                }
            } else if (newAttributeList.length > 1) {
                const measureList = newAttributeList.map(({ id, ...rest }) => rest)
                const manyResult = await createManyMeaureUnit(measureList)
                console.log(manyResult)
            }
        } catch (error) {
            console.log(error)
        }

        try {
            if (updatedItemList.length > 0) {
                for (let i of updatedItemList) {
                    const updatedList = updatedItemList.map(({ id, ...rest }) => rest)
                    const updateResult = await updateMeasureUnit(i.id, ...updatedList)
                    console.log(updateResult)
                }

            }
        } catch (error) {
            console.log(error)

        }
    };



    return (
        <div className="container mx-auto p-2 relative">
            {loading && <ProgressIndicator message={"Saving Record"} />}
            {errorMessage && <ErrorMessage content={errorMessage} />}
            <h1 className="text-3xl font-bold mb-6">Attributes Management</h1>
            <form onSubmit={formHandler}>
                <div className="flex justify-end mt-2 mb-2">
                    <button type="button" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={addRow}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button type="button" className=" bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2" onClick={() => setShowFilter(true)}>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                    <button type="submit" className=" bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2">
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>

                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {showFilter ? <tr>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input onChange={handleFilter} type="text" id="unit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
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
                                        <label htmlFor="abbreviation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Path</label>
                                        <input onChange={handleFilter} type="text" id="abbreviation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th></tr> :
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abbreviation</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>}

                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {measureunits?.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            name="unit"
                                            value={item.unit}
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
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => deleteItems(item)}
                                            className="text-red-500 hover:text-red-700">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
};

export default MeasuringUnit;
