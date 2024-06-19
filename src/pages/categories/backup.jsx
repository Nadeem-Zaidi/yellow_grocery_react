import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash, faFilter, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from '../../components/modal/loading_modal';
import AttributeLookup from "../../components/categories/lookups/attribute_lookups";
import { addCategorySpec, deleteCategorySpec, updateCategorySpec } from "../../components/categories/side_effects/categories_with_parent_null";
import uploadImages from "../../firebase/upload_images";
import TextField from "../../utilities/textfield";
import TextFieldInList from "../../utilities/textfield_inlist";
import { useFetchCategoryWithIdQuery } from "../../store/api/api";
import CategorySpecTable from "../../tables/category_spec_table";
import MeasureunitLookup from "../../lookups/measureunit_lookup";

const CategoryDetails = () => {
    const { id } = useParams();
    const { data, isSuccess: fetchIsSuccess, isLoading: fetchIsLoading, error: fetchError } = useFetchCategoryWithIdQuery(id);

    const [attributeLookUp, setAttributeLookup] = useState(false);
    const [category, setCategory] = useState({});
    const [specs, setSpecs] = useState([]);
    const [updatedItemsList, setUpdatedItemsList] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRowByLookUp, setSelectedRowByLookUp] = useState(null);
    const [existingImages, setExistingImages] = useState([]);
    const [images, setImages] = useState([]);
    const [measuringLookup, setMeasuringLookup] = useState(false);
    const [measureunit, setMeasureUnit] = useState("");

    useEffect(() => {
        if (fetchIsSuccess && data) {
            setCategory(data);
            setSpecs(data.CategorySpec || []);
            setExistingImages(data.images);
        }
    }, [fetchIsSuccess, data]);

    const attributeLookUpController = (rowitem) => {
        setSelectedRowByLookUp(rowitem);
        setAttributeLookup(true);
    };

    const selectAttributeFromLookUp = (selectedAttribute) => {
        setSpecs(specs.map(item =>
            item.id === selectedRowByLookUp.id ? { ...item, attributename: selectedAttribute.attributename } : item
        ));
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
            try {
                await deleteCategorySpec(rowitem.id);
                setSpecs(specs.filter(item => item.id !== rowitem.id));
            } catch (error) {
                setErrorMessage(error.message || 'Error deleting item');
                setShowError(true);
            }
        }
    };

    const onChangeInput = (data, e) => {
        const { name, value } = e.target;
        const updatedItem = { ...data, [name]: value };

        setSpecs(specs.map(item =>
            item.id === data.id ? updatedItem : item
        ));

        if (!data.isNew) {
            setUpdatedItemsList(prev => ({
                ...prev,
                [data.id]: updatedItem
            }));
        }
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const uploaded_image_url = [];

        try {
            if (images.length > 0) {
                for (let image of images) {
                    const uploaded_image = await uploadImages(image);
                    uploaded_image_url.push(uploaded_image);
                }

                if (uploaded_image_url.length > 0) {
                    const data = { "images": uploaded_image_url };
                    const id = category.id;
                    await updateCategory({ id, data });
                }
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }

        if (updatedItemsList.length > 0) {
            try {
                for (let item of Object.values(updatedItemsList)) {
                    await updateCategorySpec(item);
                }
            } catch (error) {
                console.error("Error updating items:", error);
            }
        }

        if (specs.length > 0) {
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
        }
    };

    const handleImageChange = (e) => {
        const fileList = Array.from(e.target.files);
        setImages(prev => [...prev, ...fileList]);
    };

    const measuringLookupController = () => {
        setMeasuringLookup(true);
    };

    const selectMeasureUnit = (measureunit) => {
        setMeasureUnit(measureunit);
        setMeasuringLookup(false);
    };

    const closeMeasuringunitLookup = () => {
        setMeasuringLookup(false);
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Category Details</h1>
                <button
                    type='submit'
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                    onClick={formSubmitHandler}
                >
                    Save
                </button>
            </div>

            {attributeLookUp && (
                <LoadingModal>
                    <AttributeLookup selectedItem={selectAttributeFromLookUp} />
                </LoadingModal>
            )}
            {measuringLookup && (
                <LoadingModal onClose={closeMeasuringunitLookup}>
                    <MeasureunitLookup select={selectMeasureUnit} />
                </LoadingModal>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <TextField name="Name" value={category.name} readOnly className="flex-1" />
                    <TextField name="Description" value={category.description} readOnly className="flex-1" />
                </div>

                <div className="space-y-6">
                    <TextField name="Hierarchy" value={category.path} readOnly className="mt-4" />
                </div>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">Upload Images</h2>
            <div className="flex flex-wrap mt-2 space-x-2">
                <div className="w-48 h-48 mb-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageChange} />
                    </label>
                </div>

                <div className="flex flex-wrap space-x-2">
                    {existingImages.map((image, index) => (
                        <div key={index} className="relative w-48 h-48 mb-4">
                            <img
                                src={image}
                                alt={`Uploaded ${index}`}
                                className="w-full h-full object-cover border border-gray-400 rounded-md"
                            />
                            <button
                                onClick={() => setExistingImages(existingImages.filter((_, i) => i !== index))}
                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}

                    {images.map((image, index) => (
                        <div key={index} className="relative w-48 h-48 mb-4">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded ${index}`}
                                className="w-full h-full object-cover border border-gray-400 rounded-md"
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

            <div className="mb-8">
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
                <div className="text-lg font-semibold text-gray-800 mb-4">Category Specification</div>
                <form onSubmit={formSubmitHandler}>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="overflow-x-auto p-4 bg-gray-100 rounded-lg shadow-md">
                            <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-t-lg shadow-inner">
                                <div className="font-semibold text-gray-700 uppercase tracking-wider">Category Id</div>
                                <div className="font-semibold text-gray-700 uppercase tracking-wider">Attribute Name</div>
                                <div className="font-semibold text-gray-700 uppercase tracking-wider">Measuring Unit</div>
                                <div className="font-semibold text-gray-700 uppercase tracking-wider">Actions</div>
                            </div>
                            <div className="bg-white rounded-b-lg shadow-inner divide-y divide-gray-200">
                                {specs.map((item) => (
                                    <div key={item.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors duration-200">
                                        <div className="flex items-center space-x-2">
                                            <TextFieldInList
                                                name="Attribute Name"
                                                value={item.attributename}
                                                onChange={(e) => onChangeInput(item, e)}
                                                className="mb-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => attributeLookUpController(item)}
                                                className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
                                            >
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </div>
                                        <div className="flex flex-row">
                                            <TextFieldInList
                                                name="Measuring Unit"
                                                value={measureunit}
                                                onChange={(e) => onChangeInput(item, e)}
                                                className="mb-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={measuringLookupController}
                                                className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => deleteItems(item)}
                                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Attributes</button>
                        <button type="button" onClick={addRow} className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Row</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryDetails;
