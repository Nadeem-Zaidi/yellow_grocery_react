import React, { useCallback, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import uploadImages from "../../firebase/upload_images";
import TextField from "../../utilities/textfield";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/loading_modal";
import CategoryLookup from "../../lookups/categories_lookup";
import ErrorMessage from "../../utilities/error_box";

import { createCategory } from "../../api/api";
import ProgressIndicator from "../../utilities/show_progress_indicator";
import CategoryListTable from "./categories_table_view.jsx/category_list_table";

const CreateCategory = () => {
  const [categoryName, setcategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPath, setCategoryPath] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categoryLookup, setCategoryLookup] = useState(false);
  const [updatedItemsList, setUpdatedItemsList] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const categoryNameInputController = (e) => {
    setcategoryName(e.target.value);
  };
  const categoryDescriptionInputController = (e) => {
    setCategoryDescription(e.target.value);
  };

  const categoryPathInputController = (e) => {
    setCategoryPath(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("running form handler");
    const uploaded_image_url = [];
    let data = {};

    setIsLoading(true);

    try {
      if (images.length > 0) {
        for (let image of images) {
          const uploaded_image = await uploadImages(image);
          uploaded_image_url.push(uploaded_image);
        }
      }

      uploaded_image_url.length > 0 ? (data.images = uploaded_image_url) : [];
      if (categoryName) {
        data = {
          parent: categoryId,
          name: categoryName,
          description: categoryDescription,
          images: uploaded_image_url.length > 0 ? uploaded_image_url : [],
        };
      }
      const categoryResult = await createCategory(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage("Some thing went wrong in saving category");
    }

    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setImages((prev) => [...prev, ...fileList]);
  };

  const categoryLookupController = () => {
    setCategoryLookup(true);
  };

  const selectCategory = (item) => {
    setCategoryPath(item.path);
    setCategoryId(item.id);
    setCategoryDescription(item.description);
    setCategoryLookup(false);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg relative">
      {isLoading && <ProgressIndicator message="Saving Category" />}
      {errorMessage && (
        <ErrorMessage
          content="Error in creating product"
          onClose={() => {
            setErrorMessage(false);
          }}
          boxType="error"
        />
      )}
      {categoryLookup && (
        <Modal>
          <div className="h-64">
            <CategoryLookup selectCategory={selectCategory} />
          </div>
        </Modal>
      )}
      <div className="fixed bottom-0 right-4"></div>
      <div className="flex justify-between items-center mb-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={formSubmitHandler}
        >
          Save
        </button>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-800">
        Category Detail
      </h2>
      <form onSubmit={formSubmitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="space-y-6">
            <TextField
              name="Name"
              value={categoryName}
              onChange={categoryNameInputController}
              className="flex-1"
            />
            <TextField
              name="Description"
              value={categoryDescription}
              onChange={categoryDescriptionInputController}
              className="flex-1"
            />
          </div>

          <div className="space-y-6 relative">
            <TextField
              name="Parent"
              value={categoryPath}
              onChange={categoryPathInputController}
              className="mt-4"
            />
            <div className="absolute right-0 top-0">
              <button type="button" onClick={categoryLookupController}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          Upload Images
        </h2>
        <div className="flex flex-wrap mt-2 space-x-2">
          <div className="w-48 h-48 mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex flex-wrap space-x-2">
            {images.map((image, index) => (
              <div key={index} className="relative w-48 h-48 mb-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover border border-gray-400 rounded-md"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start w-64">
          <button className="bg-primary-light hover:bg-primary rounded-full">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
