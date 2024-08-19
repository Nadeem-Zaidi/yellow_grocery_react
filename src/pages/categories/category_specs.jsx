import React, { useEffect, useState,useCallback} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash, faPlus, faFilter, faSave } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../../utilities/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createManySpecs, createSpecs, deleteCategorySpecs, fetchCategoriesSpecs, updateCategorySpecs } from "../../api/api";
import Modal from "../../components/modal/loading_modal";
import AttributeLookup from "../../components/categories/lookups/attribute_lookups";
import MeasureLookup from "../../lookups/measureunit_lookup";

const CategorySpec = (props) => {
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const [filterKeys, setFilterKeys] = useState({attributename:'',measureunit:''});
    const [attributeLookup, setAttributeLookup] = useState(false);
    const [newFields, setNewFields] = useState([]);
    const [existingFields, setExistingFields] = useState([]);
    const [measureLookup, setMeasureLookup] = useState(false);
    const [selectedRowByLookUp, setSelectedRowByLookUp] = useState(null);
    const [specs, setSpecs] = useState([]);

    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["catespecs",sortConfig,filterKeys],
        queryFn: ({pageParam}) => fetchCategoriesSpecs({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction, filterKeys, id:props.categoryid}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined
    });

    useEffect(() => {
        if (status === 'success' && data) {
            const allSpecs = data.pages.flatMap(page => page.data);
            setSpecs(allSpecs);
        }
    }, [status, data]);

    console.log(specs,"***")

    const addRow = () => {
        const newRow = {
            id: `new_${specs.length + 1}`,
            attributename: '',
            categoryid: '',
            measureunit: '',
            isNew: true
        };
        setSpecs([...specs, newRow]);
    };

    const attributeLookupController = (rowitem) => {
        setSelectedRowByLookUp(rowitem);
        setAttributeLookup(true);
    };

    const selectAttributeFromLookup = (selectedAttribute) => {
        if (specs.some(item => item.attributename === selectedAttribute.attributename)) {
            setErrorMessage('Duplicate attribute name is not allowed.');
            setShowError(true);
            return;
        }
        setSpecs(specs.map(item => item.id === selectedRowByLookUp.id ? { ...item, attributename: selectedAttribute.attributename } : item));
        const event = { target: { name: 'attributename', value: selectedAttribute.attributename }};
        onChangeInput(selectedRowByLookUp, event);
        setAttributeLookup(false);
    };

    const measureLookupController = (rowitem) => {
        setSelectedRowByLookUp(rowitem);
        setMeasureLookup(true);
    };

    const selectMeasureLookup = (selectedMeasureRow) => {
        if (specs.some(item => item.measureunit === selectedMeasureRow.unit)) {
            // Handle duplicate measure unit case if needed
        }
        setSpecs(specs.map(item => item.id === selectedRowByLookUp.id ? { ...item, measureunit: selectedMeasureRow.unit } : item));
        const event = { target: { name: 'measureunit', value: selectedMeasureRow.unit }};
        onChangeInput(selectedRowByLookUp, event);
        setMeasureLookup(false);
    };

    const onChangeInput = (row, e) => {
        const { name, value } = e.target;
        // console.log("running onchange", row, name, value); // Added logging

        // Update specs
        const updatedSpecs = specs.map(item => item.id === row.id ? { ...item, [name]: value } : item);
        setSpecs(updatedSpecs);

        // Update newFields or existingFields based on whether the item is new
        if (row.isNew) {
            setNewFields(prevList => {
                const existingItem = prevList.find(item => item.id === row.id);
                const updatedItem = existingItem ? { ...existingItem, [name]: value } : { id: row.id, [name]: value };
                return [...prevList.filter(item => item.id !== row.id), updatedItem];
            });
        } else {
            setExistingFields(prevList => {
                const existingItem = prevList.find(item => item.id === row.id);
                const updatedItem = existingItem ? { ...existingItem, [name]: value } : { id: row.id, [name]: value };
                return [...prevList.filter(item => item.id !== row.id), updatedItem];
            });
        }
    };

    const deleteRow = async (row) => {
        if (row.isNew) {
            setSpecs(specs.filter(item => item.id !== row.id));
        } else {
            try {
                await deleteCategorySpecs(row.id);
                setSpecs(specs.filter(item => item.id !== row.id));
            } catch (error) {
                console.log(error);
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


  
    const formHandler = async(e) => {
        e.preventDefault();
        try{
            if(newFields.length >0){
               
                for(let i of newFields){
                    let catdata={
                        categoryid:props.categoryid,
                        attributename:i.attributename,
                        measureunit:i.measureunit
                    }
                    
                    const result=await createSpecs(catdata)
                    console.log(result) 
                }     
            }

            if(existingFields.length >0){
                for(let i of existingFields){
                    console.log(i)
                    let catData={
                        attributename:i.attributename,
                        measureunit:i.measureunit
                        
                    }
                    console.log(data)
                    const result=await updateCategorySpecs(i.id,catData)
                    console.log(result)
                }
            }

        }catch(error){
            console.log(error)

        }
    };



    return (
        <div>
            {attributeLookup && <Modal>
                <div className="w-68">
                    <div className="flex flex-row justify-end items-center bg-white">
                        <button type="button" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2" onClick={() => { }}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                    <AttributeLookup selectedItem={selectAttributeFromLookup} />
                </div>
            </Modal>}

            {measureLookup && <Modal>
                <MeasureLookup selectItem={selectMeasureLookup} />
            </Modal>}
            <form onSubmit={formHandler}>
                <div className="flex justify-end mt-2 mb-2">
                    <button type="button" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={addRow}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button type="button" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2" onClick={() => { }}>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                    <button type="submit" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2">
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Measuringunit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {specs?.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-row items-center">
                                            <input
                                                name="attributename"
                                                value={item.attributename}
                                                type="text"
                                                onChange={(e) => onChangeInput(item, e)}
                                                placeholder="Type Attribute Name"
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                            <button type="button" onClick={() => attributeLookupController(item)}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </div>
                                    </td>
                                    <div className="flex flex-row">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                name="measureunit"
                                                value={item.measureunit}
                                                type="text"
                                                onChange={(e) => onChangeInput(item, e)}
                                                placeholder="Type Data Type"
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                            <button type="button" onClick={() => measureLookupController(item)}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </td>
                                    </div>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => deleteRow(item)}
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

export default CategorySpec;
