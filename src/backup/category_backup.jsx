import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";

import LoadingModal from '../modal/loading_modal';
import AttributeList from "../../attributes/attribute_list";
import AttributeLookup from "./lookups/attribute_lookups";
import { addCategorySpec, categoryWithId, deleteCategorySpec, fetchAllCategorySpec, updateCategorySpec } from "./side_effects/categories_with_parent_null";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import uploadImages from "../../firebase/upload_images";
import TextField from "../../utilities/textfield";
// import { storage } from "./firebaseConfig";  // Assuming firebaseConfig.js is in the same directory

const CategoryDetails = () => {
    const { id } = useParams();

    const { data, status, error, refetch } = useQuery(["categoryWithId", id], () => categoryWithId(id));


    const [attributeLookUp, setAttributeLookup] = useState(false);
    const [category, setCategory] = useState({});
    const [specs, setSpecs] = useState([]);
    const [itemToUpdate, setItemToUpdate] = useState({});
    const [updatedItemsList, setUpdatedItemsList] = useState([]);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRowByLookUp, setSelectedRowByLookUp] = useState(null);
    const [images, setImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        if (status === "success" && data) {
            setCategory(data);
            setSpecs(data?.CategorySpec)
        }
    }, [status, data]);


    useEffect(() => {
        setUpdatedItemsList([]);
        Object.entries(itemToUpdate).forEach(([key, updatedItem]) => {
            setUpdatedItemsList(prevList => [...prevList, updatedItem]);
        });
    }, [itemToUpdate]);

    const attributeLookUpController = (rowitem) => {
        setSelectedRowByLookUp(rowitem);
        setAttributeLookup(true);
    };

    const selectAttributeFromLookUp = (selectedAttribute) => {
        setSpecs(specs =>
            specs.map(item =>
                item.id === selectedRowByLookUp.id ? { ...item, attributename: selectedAttribute.attributename } : item
            )
        );

        setAttributeLookup(false);
    };

    const addRow = () => {
        const newRow = {
            id: `new_${specs.length + 1}`,
            attributename: '',
            categoryid: '',
            measureunitid: '',
            isNew: true
        };
        setSpecs([...specs, newRow]);
    };

    const deleteItems = async (rowitem) => {
        if (rowitem.isNew) {
            setSpecs(specs.filter(item => item.id !== rowitem.id));
        } else {
            setDeletingStatus(true);
            try {
                await deleteCategorySpec(rowitem.id);
                await refetch();
            } catch (error) {
                setErrorMessage(error.message || 'Error deleting item');
                setShowError(true);
            } finally {
                setDeletingStatus(false);
            }
        }
    };

    const onChangeInput = (data, e) => {
        const { name, value } = e.target;
        if (!data.isNew) {
            setItemToUpdate(prevItemToUpdate => ({
                ...prevItemToUpdate,
                [data.id]: {
                    ...prevItemToUpdate[data.id],
                    id: data.id,
                    categoryid: data.categoryid,
                    [name]: value
                }
            }));
        }

        setSpecs(specs =>
            specs.map(item =>
                item.id === data.id ? { ...item, [name]: value } : item
            )
        );
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        console.log("*************Running Form Handler *********************");

        const uploaded_image_url = [];

        // Upload images

        try {
            if (images.length > 0) {
                try {
                    for (let image of images) {
                        let uploaded_image = await uploadImages(image);
                        uploaded_image_url.push(uploaded_image);
                    }
                } catch (error) {
                    console.error("Error uploading images:", error);
                }
            }
        } catch (error) {
            console.log(error)
        }


        // Update existing items
        try {
            if (updatedItemsList.length > 0) {
                for (let item of updatedItemsList) {
                    console.log(item);
                    await updateCategorySpec(item);
                }
            }
        } catch (error) {
            console.error("Error updating items:", error);
        }

        // Add new specs
        try {
            for (let spec of specs) {
                if (spec.isNew) {
                    const data = {
                        attributename: spec.attributename,
                        categoryid: id,
                        measureunitid: spec.measureunitid
                    };
                    await addCategorySpec(data);
                }
            }
        } catch (error) {
            console.error("Error adding specs:", error);
        }

        // Refetch data
        try {
            await specData.refetch();
        } catch (error) {
            console.error("Error refetching data:", error);
        }
    };


    const testClick = () => {
        console.log("**********Button Clicked ******************");
    };

    const handleImageChange = (e) => {
        const fileList = Array.from(e.target.files); // Convert FileList to array
        setImages(prev => [...prev, ...fileList])
    };

    const handleImageUpload = (e) => {
        const fileList = Array.from(e.target.files); // Convert FileList to array
        setImages(prev => [...prev, ...fileList])



    };
    console.log(category)


    return (
        <>
            <div className="flex flex-col mx-2 mt-4 relative">
                <div className="fixed right-4 bottom-4">
                    <button type='submit' className="bg-gray-400 w-24">Save</button>
                </div>

                <div className="flex flex-row">
                    <button className="bg-gray-200 p-1 ">Product</button>
                    <button className="bg-gray-200 ml-2 p-1">Specification</button>
                </div>
                {attributeLookUp && <LoadingModal>
                    <AttributeLookup selectedItem={selectAttributeFromLookUp} />
                </LoadingModal>}

                <div className="flex flex-row mt-9">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="relative h-11 w-full min-w-[200px]">
                                <TextField name="Nadeem" value={category.name} />

                                {/* <input

                                    placeholder=""
                                    readOnly
                                    value={category.name}
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                />
                                <label
                                    className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Category Name
                                </label> */}
                            </div>

                            <div className="relative h-11 w-full min-w-[200px] mx-4">
                                <input
                                    placeholder=""
                                    readOnly
                                    value={category.description}
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                />
                                <label
                                    className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Description
                                </label>
                            </div>
                        </div>

                        <div className="relative h-11 w-full min-w-[200px] mt-9">
                            <div className="flex flex-row">
                                <input
                                    placeholder=""
                                    readOnly
                                    value={category.path}
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                />
                            </div>

                            <label
                                className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Hierarchy
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col ml-44">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                placeholder=""
                                readOnly
                                value={category.id}
                                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            />
                            <label
                                className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Category Id
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-9">
                    <div className="bg-gray-200 rounded-sm">Image Upload</div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload multiple files</label>
                    <input onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />

                    <div className="flex flex-row">
                        {images?.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index}`}

                                    className="w-32 h-32 object-cover border border-gray-400 rounded-md"
                                />
                                <button
                                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>


                {/* <div className="flex flex-col mt-4">
                        <input type="file" onChange={handleImageChange} />
                        <button onClick={handleImageUpload} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2">Upload Image</button>
                        {uploadProgress > 0 && <p>Upload progress: {uploadProgress}%</p>}
                        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4" />}
                    </div> */}
            </div>

            <div className="flex flex-col mt-9">
                <div className="bg-gray-200 rounded-sm">Category Specification</div>

                <form onSubmit={formSubmitHandler}>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Id Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Measuringunit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {specs?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                name="categoryid"
                                                value={id}
                                                type="text"
                                                onChange={(e) => onChangeInput(item, e)}
                                                placeholder="Type Description"
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
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
                                                <button type="button" onClick={() => { attributeLookUpController(item) }}>
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                name="measureunitid"
                                                value={item.measureunitid}
                                                type="text"
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
                    <div className="flex mt-4">
                        <button onClick={testClick} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Attributes</button>
                        <div onClick={addRow} className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Row</div>
                    </div>
                </form>
            </div>

        </>
    );
};

export default CategoryDetails;
