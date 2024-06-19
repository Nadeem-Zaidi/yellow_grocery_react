import { useEffect, useState } from "react";
import { saveCategory } from "../../components/categories/side_effects/save_category";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/loader";
import { categoriesList } from "../../components/categories/side_effects/categories_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import uploadImages from "../../firebase/upload_images";

const AddCategoryForm = (props) => {
    const { data, status } = useQuery({ queryKey: ["categories_select"], queryFn: categoriesList });

    const [categoryName, setCategoryName] = useState("");
    const [parentSelected, setParentSelected] = useState("self");
    const [saving, setSaving] = useState(false);
    const [images, setImages] = useState([])

    const categoryNameController = (e) => {
        setCategoryName(e.target.value);
    };

    const categoryParentController = (e) => {
        console.log(e.target.value)
        setParentSelected(e.target.value);
    };

    const selectImages = (e) => {
        const fileList = Array.from(e.target.files)
        setImages(prev => [...prev, ...fileList])
    }


    const formController = async (e) => {
        e.preventDefault();
        let data = {
            name: categoryName,
            parent: parentSelected === "self" ? null : parentSelected,

        };
        const uploaded_images_url = []
        setSaving(true);

        try {
            if (images.length > 0) {
                for (let image of images) {
                    const uploaded_image = await uploadImages(image)
                    uploaded_images_url.push(uploaded_image)
                }

            }

        } catch (error) {
            console.log(error)

        }



        if (uploaded_images_url.length > 0) {
            data.images = uploaded_images_url
        }

        try {

            await saveCategory(data);
        } catch (error) {
            setSaving(false);
            console.log(error);
        } finally {
            setSaving(false);
        }
        setSaving(false)

        if (props.refetch) {
            await props.refetch();
            props.close()// Ensure refetch is awaited
        }
    };




    return (
        <form onSubmit={formController}>
            <div className="relative">
                {status === "loading" && (
                    <div className="flex flex-col justify-center items-center absolute bg-red-400 z-10 bg-opacity-40 w-full h-full">
                        <Loader />
                    </div>
                )}

                {saving && (
                    <div className="flex flex-col justify-center items-center absolute bg-red-400 z-10 bg-opacity-40 w-full h-full">
                        <Loader />
                    </div>
                )}
                <div className="relative rounded-md shadow-sm">
                    <div className="bg-slate-100 rounded-md px-1 py-1">New Category</div>

                    <div className="flex flex-row">
                        <div className="mb-5 mx-2 py-2">
                            <label htmlFor="categoryname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Enter Name
                            </label>
                            <input
                                type="text"
                                id="categoryname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Category Name"
                                required
                                onChange={categoryNameController}
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <div className="mb-5 mx-2 py-2">
                                <label htmlFor="parentCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Select Parent
                                </label>
                                <select
                                    id="parentCategory"
                                    value={parentSelected}
                                    onChange={categoryParentController}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option key="defaultself" value="self">
                                        self
                                    </option>
                                    {status === 'success' && data && data?.data.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}


                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-9">
                        <div className="bg-gray-200 rounded-sm">Image Upload</div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">
                            Upload multiple files
                        </label>
                        <input
                            onChange={selectImages}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="multiple_files"
                            type="file"
                            multiple
                        />
                    </div>
                    <div className="flex flex-row">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
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

                    <div className="flex flex-row mt-8">
                        <button type="submit" className=" bg-primary hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-white w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-1 my-1">
                            Save
                        </button>
                        <div className="text-white bg-primary hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-1 my-1 cursor-pointer" onClick={props.close}>
                            Close
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddCategoryForm;
