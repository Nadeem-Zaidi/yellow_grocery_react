import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilter, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/loader/loader";
import Modal from "../components/modal/loading_modal";
import { addAttributes, deleteRow, fetchAllAttributes, updateAttribute } from "./attributes_side_effect/attribute_side_effects";

const AttributeList = () => {
    const { data, status, error, refetch } = useQuery({
        queryKey: ["attributes"],
        queryFn: fetchAllAttributes,
    });

    const [attributes, setAttributes] = useState([]);
    const [updatedItemsList, setUpdatedItemsList] = useState([]);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (status === "success" && data) {
            setAttributes(data);
        }
    }, [status, data]);

    const onChangeInput = useCallback((data, e) => {
        const { name, value } = e.target;
        const updatedAttributes = attributes.map(item =>
            item.id === data.id ? { ...item, [name]: value } : item
        );
        setAttributes(updatedAttributes);

        if (!data.isNew) {
            setUpdatedItemsList(prevList => {
                const updatedItem = { ...prevList.find(item => item.id === data.id), [name]: value, id: data.id };
                return [...prevList.filter(item => item.id !== data.id), updatedItem];
            });
        }
    }, [attributes]);

    const addRow = useCallback(() => {
        const newRow = {
            id: `new_${attributes.length + 1}`,
            attributename: '',
            description: '',
            datatype: '',
            isNew: true,
        };
        setAttributes(prevAttributes => [...prevAttributes, newRow]);
    }, [attributes]);

    const deleteItems = async (rowitem) => {
        if (rowitem.isNew) {
            setAttributes(attributes.filter(item => item.id !== rowitem.id));
        } else {
            setDeletingStatus(true);
            try {
                await deleteRow(rowitem.id);
                setAttributes(attributes.filter(item => item.id !== rowitem.id));
            } catch (error) {
                setErrorMessage(error.message || 'Error deleting item');
                setShowError(true);
            } finally {
                setDeletingStatus(false);
            }
        }
    };

    const formHandler = async (e) => {
        e.preventDefault();
        try {
            if (updatedItemsList.length > 0) {
                await Promise.all(updatedItemsList.map(item => updateAttribute(item)));
            }
            const newAttributes = attributes.filter(item => item.isNew);
            if (newAttributes.length > 0) {
                await Promise.all(newAttributes.map(i => addAttributes({
                    attributename: i.attributename,
                    description: i.description,
                    datatype: i.datatype,
                })));
            }
            refetch();
        } catch (error) {
            setErrorMessage(error.message || 'Error processing attributes');
            setShowError(true);
        }
    };

    const onClose = () => {
        setShowError(false);
    };

    return (
        <div className="container mx-auto p-2 relative">
            <h1 className="text-3xl font-bold mb-6">Attributes Management</h1>
            {status === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <Loader />
                </div>
            )}

            {showError && errorMessage && (
                <Modal onClose={onClose}>
                    <p>{errorMessage}</p>
                </Modal>
            )}

            {status === "success" && (
                <>
                    <form onSubmit={formHandler}>
                        <div className="flex justify-end mt-2 mb-2">
                            <button type="button" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={addRow}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button type="button" className="bg-primary hover:bg-primary-light text-white rounded-full w-8 h-8 flex items-center justify-center ml-2">
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {attributes.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    name="attributename"
                                                    value={item.attributename}
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
                                                    name="datatype"
                                                    type="text"
                                                    value={item.datatype}
                                                    onChange={(e) => onChangeInput(item, e)}
                                                    placeholder="Type Data Type"
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {deletingStatus ? <Loader /> : (
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteItems(item)}
                                                        className="text-red-500 hover:text-red-700">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default AttributeList;
