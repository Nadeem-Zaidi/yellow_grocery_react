import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faTrash, faPlus, faFilter, faSave } from "@fortawesome/free-solid-svg-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createSpecs } from "../../api/api"
import { LastPage } from "@mui/icons-material"
import Modal from "../../components/modal/loading_modal"
import AttributeLookup from "../../components/categories/lookups/attribute_lookups"
import MeasureLookup from "../../lookups/measureunit_lookup"


const CategorySpec = (props) => {

    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' })
    const [filterKeys, setFilterKeys] = useState(null)
    const [attributeLookup, setAttributeLookup] = useState(false)
    const [newFields, setNewFields] = useState([])
    const [existingFields, setExistingFields] = useState([])
    const [measureLookup, setMeasureLookup] = useState(false)
    const [selectedRowByLookUp, setSelectedRowByLookUp] = useState(null)
    const [specs, setSpecs] = useState([])

    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["categoryspecs"],
        queryFn: ({ pageParam, sortConfig, filterKeys }) => createSpecs({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction, filterKeys }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined

    })

    useEffect(() => {
        if (status === 'success' && data) {
            const allSpecs = data.pages.flatMap(page => page.data)
            setSpecs(allSpecs)

        }
    }, [status, data])

    const addRow = () => {
        const newRow = {
            id: `new_${specs.length + 1}`,
            attributename: '',
            categoryid: '',
            measureunit: '',
            isNew: true
        };
        setSpecs([...specs, newRow]);
    }

    const attributeLookupController = (rowitem) => {
        setSelectedRowByLookUp(rowitem)
        setAttributeLookup(true)

    }

    const selectAttributeFromLookup = (selectedAttribute) => {
        if (specs.some(item => item.attributename === selectedAttribute.attributename)) {
            setErrorMessage('Duplicate attribute name is not allowed.');
            setShowError(true);
            return;
        }
        setSpecs(specs.map(item => item.id === selectedRowByLookUp.id ? { ...item, attributename: selectedAttribute.attributename } : item))
        setAttributeLookup(false)
    }

    const measureLookupController = (rowitem) => {
        setSelectedRowByLookUp(rowitem)
        setMeasureLookup(true)

    }
    const selectMeasureLookup = (selectedMeasureRow) => {
        if (specs.some(item => item.measureunit === selectedMeasureRow.unit)) {

        }
        setSpecs(specs.map(item => item.id === selectedRowByLookUp.id ? { ...item, measureunit: selectedMeasureRow.unit } : item))

        setMeasureLookup(false)

    }

    const onChangeInput = (row, e) => {
        const { name, value } = e.target
        if (item.isNew) {
            setNewFields(prevList => {
                const existingFields = prevList.find(item => item.id === row.id)
                const newFields = existingFields ? { ...existingFields, [name]: value } : { id: row.id, [name]: value }
                return [...prevList.filter(item => item.id !== row.id), newFields]
            })
        }

        const updatedFields = specs.map(s => s.id === row.id ? { ...s, [name]: value } : s)
    }

    const deleteRow = async (row) => {
        if (row.isNew) {
            setSpecs(specs.filter(item => item.id !== row.id))
        } else {
            try {
                await deleteCategorySpecs(row.id)
                setSpecs(specs.filter(item => item.id !== row.id))

            } catch (error) {
                console.log(error)

            }
        }

    }

    const formHandler = (e) => {
        e.preventDefault()
        console.log(specs)



    }
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

            {
                measureLookup && <Modal>
                    <MeasureLookup selectItem={selectMeasureLookup} />

                </Modal>
            }
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
                            {specs.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-row items-center">
                                            <input
                                                name="attributename"
                                                value={item.attributename}
                                                type="text"
                                                onChange={(e) => props.onChange(item, e)}
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
                                                name="measureunitid"
                                                value={item.measureunit}
                                                type="text"
                                                onChange={(e) => onChange(item, e)}
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


    )
}

export default CategorySpec